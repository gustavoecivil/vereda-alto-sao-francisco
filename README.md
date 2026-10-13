# Vereda — Inteligência Ambiental | Alto São Francisco SF1

Prévia interativa de investigação da qualidade das águas superficiais do Alto São Francisco, Minas Gerais. Esta página pública apresenta o **Panorama Científico** com dez estações IGAM, contorno territorial, hidrografia principal e séries históricas, como demonstração em desenvolvimento.

## Acessar a página

Após habilitar GitHub Pages: https://gustavoecivil.github.io/vereda-alto-sao-francisco/

## Fontes e cobertura

- 10 estações oficiais no recorte Alto São Francisco — SF1.
- 25.247 observações individuais de parâmetros, registradas entre 22/09/1997 e 23/11/2021.
- 63 parâmetros catalogados. As unidades originais por medição ainda requerem comprovação documental.
- IQA anual (2000–2024): 250 registros estação-ano, dos quais 30 contêm valor numérico, e os demais classificação/indicação de ausência.
- 605 feições simplificadas de drenagem principal obtidas da IDE-Sisema/ANA (BHO 2018), ordem Strahler >= 7. É um **subconjunto do recorte retangular**, visualmente limitado ao polígono SF1; não é hidrografia completa.
- Coordenadas das estações da base SQL Server VSI_SF1, exportadas em modo somente leitura.
- Links Google Maps Satellite/Street View abrem plataformas externas por coordenada: não são fotos autenticadas de campanha nem mapas incorporados.

## Sobre os dados

Este é um **snapshot estático, publicado a partir de uma exportação local validada**, e **não há conexão ao SQL Server pelo navegador**. Para atualizar observações, regras ou estações, publicar uma nova versão validada. Os dados presentes neste site não devem ser interpretados como atualizados em tempo real.

## Limites científicos

**Conformidade legal: NOT_RELEASED.** As classes cadastradas não comprovam a classe juridicamente vigente do trecho e da coleta. Unidades originais de amostras e aplicação das regras de censura e estatística requerem validação adicional. O site não publica conclusões de infração/conformidade nem marca campanhas em vermelho como violações legais. Resultados <L e >U representam intervalos, não valores exatos.

Não utilizar este protótipo como laudo ambiental, medição oficial, parecer jurídico ou certificado de potabilidade.

## Projeto e referências

- [IGAM — Monitoramento e informações](https://igam.mg.gov.br/)
- [ANA — Portal da Qualidade da Água](https://qualidadedaagua.ana.gov.br/)
- [IDE-Sisema — Geoportal](https://geoportal.meioambiente.mg.gov.br/home)

**Vereda é uma iniciativa independente de inteligência ambiental.** Os órgãos citados são fontes das informações; a menção não implica parceria, patrocínio ou aprovação institucional.

## Estado de implementação

O Panorama Científico permite selecionar estações e parâmetros, explorar séries com os resultados originais, localizar pontos e abrir vistas externas por satélite/Street View. Os demais módulos, a conectividade dinâmica com o SQL Server, persistência do caderno de evidências, fotografias de campo autenticadas, avaliação de conformidade e novos dados após 2021 permanecem em desenvolvimento.

O código-fonte científico, os relatórios internos e as credenciais do projeto não fazem parte desta publicação.
