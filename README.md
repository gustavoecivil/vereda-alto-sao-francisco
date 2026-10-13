# VEREDA — Inteligência Ambiental | Alto São Francisco SF1

Dashboard interativo e científico do Alto São Francisco em Minas Gerais. Versão sincronizada com o artefato mais recente produzido no Claude Desktop e exportada em 13/10/2026.

## Página pública

https://gustavoecivil.github.io/vereda-alto-sao-francisco/

## Funcionalidades

- Três direções visuais: A — Carta; B — Observatório; C — Laboratório.
- Mapa interativo com dez estações IGAM, limite oficial SF1 e seleção visual de 605 trechos principais da Base Hidrográfica Ottocodificada.
- Ficha de estação com coordenadas cadastrais, município, dominialidade e links externos Google Maps Satélite/Street View.
- Medições por parâmetro: 25.247 observações individuais de setembro/1997 a novembro/2021, 63 parâmetros, valores censurados abaixo de L ou acima de U destacados separadamente, sem imputação.
- IQA anual de 2000–2024: 250 registros estação-ano, com apenas 30 valores numéricos. Classificações textuais e ausência de coleta não são convertidas em números.
- Matriz de disponibilidade, alertas de fonte e caderno de evidências em memória da aba, ainda sem persistência/exportação.

## Restrições científicas

Conformidade jurídica: NOT_RELEASED. Ainda não existe validação temporal e por trecho da classe legal, de unidades originais por observação, condicionantes normativas e regra estatística que permita caracterizar infrações. A versão pública mantém os quatro estados normativos neutros. Um resultado censurado acima do limite analítico não significa infração legal.

O navegador não acessa o SQL Server: todos os arquivos neste site formam um snapshot estático de exportações somente leitura. A base individual termina em 2021, e o IQA possui registros até 2024. Ausência de resultados recentes na base não comprova encerramento do monitoramento. Não utilizar como laudo, certificado de potabilidade ou parecer de conformidade.

## Dados, fontes e licenças

- IGAM — Projeto Águas de Minas: https://igam.mg.gov.br/
- ANA — Portal da Qualidade da Água: https://qualidadedaagua.ana.gov.br/
- IDE-Sisema/IGAM e ANA — Base Hidrográfica Ottocodificada do rio São Francisco, camada ide_0101_sf_hidro_otto_lin:
https://idesisema.meioambiente.mg.gov.br/geonetwork/srv/api/records/c884d6f9-82b4-4e7b-8bff-736079bffc24
- Licença da camada geográfica conforme metadados: Creative Commons Atribuição 4.0 Internacional (CC BY 4.0): https://creativecommons.org/licenses/by/4.0/deed.pt-br
- Transformações derivadas: seleção dos 605 trechos principais com Strahler >= 7 no recorte retangular SF1 e simplificação geométrica cartográfica para reduzir o tamanho do arquivo. Esta camada não é a rede hidrográfica completa.
- Google Maps abre por links externos centrados nas coordenadas cadastradas; não redistribuímos imagens nem afirmamos que representam o ponto físico exato da coleta.

Vereda é um projeto independente: citar IGAM, ANA, órgãos públicos e dados de origem não implica patrocínio, parceria ou endosso institucional.

## Implantação

GitHub Pages publica os arquivos de interface (index.html), o adaptador de dados (js/dash-shim.js), as bibliotecas locais (vendor/), a identidade Vereda (assets/) e os arquivos de dados estáticos (data/).

Código científico interno, SQL Server, segredos, arquivos de auditoria do Claude e relatórios operacionais não são enviados para este repositório.

Próximos passos: validação legal robusta, observações de 2022 em diante, fotografias autenticadas das estações e caderno de evidências persistente.
