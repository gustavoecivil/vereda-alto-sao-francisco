/*
 * Vereda SF1 · camada de compatibilidade "dash" para página estática (GitHub Pages).
 *
 * O painel original roda dentro de um artefato Claude do tipo Dashboard, que fornece
 * o objeto global `dash` (dados, cálculos, filtros). Este arquivo reproduz a parte
 * dessa interface usada pela página, lendo os mesmos arquivos de dados como snapshot
 * estático em ./data/. Não há SQL Server, credenciais, endpoints internos nem APIs pagas.
 *
 * Interface reproduzida: dash.data(id), dash.calc(id, {inputs, fn}), dash.onData(fn),
 * dash.params(), dash.setParams(obj), dash.resetParams(), dash.setLink(name), dash.colors.
 * Filtros (estação, parâmetro, direção visual) ficam no endereço (#estacao=SF004&...).
 */
(function () {
  'use strict';

  // Fontes de dados: mesmos arquivos (mesmo SHA-256) anexados ao artefato original.
  var SOURCES = {
    estacoes:   {file: 'data/estacoes_oficiais_10.csv', type: 'csv'},
    obs:        {file: 'data/observacoes_1997_2021.csv', type: 'csv'},
    iqa:        {file: 'data/iqa_anual_2000_2024.csv', type: 'csv'},
    parametros: {file: 'data/parametros_63.csv', type: 'csv'},
    limites:    {file: 'data/MATRIZ_84_LIMITES_REFERENCIA_NAO_LIBERADOS.csv', type: 'csv'},
    links:      {file: 'data/links_estacoes.csv', type: 'csv'},
    sf1_limite: {file: 'data/sf1_limite.json', type: 'json'},
    sf1_hidro:  {file: 'data/sf1_hidro.json', type: 'json'}
  };
  // Valores iniciais dos filtros (dash/params do artefato original).
  var DEFAULT_PARAMS = {estacao: 'SF001', direcao: 'A'};

  var state = {};     // id -> {status, data, message}
  var calcs = {};     // id -> {inputs, fn, title, description}
  var calcCache = {};
  var callbacks = [];
  var params = Object.assign({}, DEFAULT_PARAMS, readHash());

  function readHash() {
    var out = {};
    (location.hash || '').replace(/^#/, '').split('&').forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf('=');
      if (i < 0) return;
      out[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1));
    });
    return out;
  }
  function writeHash() {
    var s = Object.keys(params).filter(function (k) { return params[k] != null && params[k] !== ''; })
      .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&');
    history.replaceState(null, '', s ? '#' + s : location.pathname + location.search);
  }

  function rawStatus(id) { return state[id] ? state[id].status : 'missing'; }

  function getCalc(id, seen) {
    if (calcCache[id]) return calcCache[id];
    var c = calcs[id];
    seen = seen || {};
    if (seen[id]) return {status: 'error', data: [], message: 'Cálculo circular: ' + id};
    seen[id] = true;
    var args = [];
    for (var i = 0; i < c.inputs.length; i++) {
      var r = resolve(c.inputs[i], seen);
      if (r.status !== 'ok') return {status: r.status, data: [], message: r.message};
      args.push(r.data);
    }
    try {
      calcCache[id] = {status: 'ok', data: c.fn.apply(null, args)};
    } catch (e) {
      calcCache[id] = {status: 'error', data: [], message: String(e && e.message || e)};
      console.error('[Vereda] cálculo ' + id + ' falhou:', e);
    }
    return calcCache[id];
  }
  function resolve(id, seen) {
    if (calcs[id]) return getCalc(id, seen);
    if (state[id]) return state[id];
    return {status: SOURCES[id] ? 'loading' : 'missing', data: []};
  }

  var redrawPending = false;
  function emit() {
    if (redrawPending) return;
    redrawPending = true;
    requestAnimationFrame(function () {
      redrawPending = false;
      callbacks.forEach(function (fn) {
        try { fn(); } catch (e) { console.error('[Vereda] erro ao desenhar:', e); }
      });
    });
  }

  function load(id) {
    var src = SOURCES[id];
    state[id] = {status: 'loading', data: []};
    fetch(src.file, {cache: 'no-cache'}).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' em ' + src.file);
      return r.text();
    }).then(function (text) {
      var rows;
      if (src.type === 'json') {
        var j = JSON.parse(text);
        rows = Array.isArray(j) ? j : (j.rows || j.data || j.results || []);
      } else {
        var p = Papa.parse(text.replace(/^﻿/, ''), {header: true, skipEmptyLines: true});
        rows = p.data;
        rows.columns = p.meta.fields;
      }
      state[id] = {status: 'ok', data: rows, columns: rows.columns || (rows[0] ? Object.keys(rows[0]) : [])};
      calcCache = {};
      emit();
    }).catch(function (e) {
      state[id] = {status: 'error', data: [], message: String(e && e.message || e)};
      calcCache = {};
      console.error('[Vereda] falha ao carregar ' + src.file + '. Abra a página por um servidor HTTP (GitHub Pages ou "python -m http.server"), não por file://.', e);
      emit();
    });
  }

  window.dash = {
    data: function (id) {
      var r = resolve(id);
      return {status: r.status, data: r.data, message: r.message, refreshing: false, meta: [], columns: r.columns || []};
    },
    calc: function (id, def) { calcs[id] = def; },
    loader: function () {},
    onData: function (fn) { callbacks.push(fn); try { fn(); } catch (e) { console.error(e); } },
    params: function () { return Object.assign({}, params); },
    setParams: function (obj) {
      Object.keys(obj || {}).forEach(function (k) { params[k] = obj[k]; });
      writeHash();
      emit();
    },
    resetParams: function () { params = Object.assign({}, DEFAULT_PARAMS); writeHash(); emit(); },
    setLink: function () {},
    refresh: function () {},
    colors: ['#1f4e79', '#3a7ca5', '#b7791f', '#5b6475', '#2f7d4f', '#7a8291', '#14213d', '#c8553d']
  };

  // Metadados das fontes para a seção "Fontes dos dados" da página.
  window.VEREDA_SOURCES = SOURCES;

  Object.keys(SOURCES).forEach(load);
  window.addEventListener('resize', function () { emit(); });
  window.addEventListener('hashchange', function () { params = Object.assign({}, DEFAULT_PARAMS, readHash()); emit(); });
})();
