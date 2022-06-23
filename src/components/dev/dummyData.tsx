export const resources = [
  {
    "firstName": "Juan",
    "lastName": "Iqbal",
    "age": 54,
    "address": "829 Alalo Way",
    "email": "wip@epa.je"
  },
  {
    "firstName": "Max",
    "lastName": "Barlow",
    "age": 46,
    "address": "1863 Finoje Glen",
    "email": "zeprevsu@dief.mg"
  },
  {
    "firstName": "Adam",
    "lastName": "Rowe",
    "age": 45,
    "address": "530 Sumul Trail",
    "email": "ku@opguhoh.qa"
  },
  {
    "firstName": "Jeremy",
    "lastName": "Stewart",
    "age": 18,
    "address": "1890 Ediri Pike",
    "email": "jicu@saposje.hk"
  },
  {
    "firstName": "Elizabeth",
    "lastName": "Thomson",
    "age": 20,
    "address": "1946 Siwhi Terrace",
    "email": "iteti@ulja.es"
  },
  {
    "firstName": "Susie",
    "lastName": "Baumann",
    "age": 49,
    "address": "1498 Inat Drive",
    "email": "piz@battor.sc"
  },
  {
    "firstName": "Charlotte",
    "lastName": "Rhodes",
    "age": 18,
    "address": "287 Heam Boulevard",
    "email": "owuoco@hewegemu.no"
  },
  {
    "firstName": "Sara",
    "lastName": "Moretti",
    "age": 54,
    "address": "339 Hunuz Turnpike",
    "email": "vu@buh.fr"
  },
  {
    "firstName": "Lydia",
    "lastName": "Signorini",
    "age": 46,
    "address": "1613 Kiop Manor",
    "email": "amibemo@vobkozu.gn"
  },
  {
    "firstName": "Mittie",
    "lastName": "Bartolozzi",
    "age": 59,
    "address": "122 Amhaf Center",
    "email": "guboc@haoc.ru"
  },
  {
    "firstName": "Mollie",
    "lastName": "Bourgeois",
    "age": 62,
    "address": "1396 Lurpo Manor",
    "email": "oke@heroz.bm"
  },
  {
    "firstName": "Abbie",
    "lastName": "Caballero",
    "age": 30,
    "address": "560 Jehtob Pike",
    "email": "omce@oppioh.im"
  },
  {
    "firstName": "Carlos",
    "lastName": "McLaughlin",
    "age": 48,
    "address": "295 Munuj Extension",
    "email": "bes@rawafso.sv"
  },
  {
    "firstName": "Jackson",
    "lastName": "Lane",
    "age": 54,
    "address": "437 Batun Grove",
    "email": "log@vahalma.gl"
  },
  {
    "firstName": "Alma",
    "lastName": "Arnetoli",
    "age": 59,
    "address": "79 Daza Trail",
    "email": "woehaaza@tabmu.lv"
  },
  {
    "firstName": "Willie",
    "lastName": "Ceder",
    "age": 32,
    "address": "1633 Rezfu Street",
    "email": "zezgel@bebo.com"
  },
  {
    "firstName": "Kyle",
    "lastName": "Leonard",
    "age": 53,
    "address": "1004 Kazev River",
    "email": "coceset@keka.jp"
  },
  {
    "firstName": "Alan",
    "lastName": "Ceccarelli",
    "age": 37,
    "address": "399 Deke View",
    "email": "wuvrojob@ra.gy"
  },
  {
    "firstName": "Henry",
    "lastName": "Newman",
    "age": 49,
    "address": "1676 Bawo Square",
    "email": "va@leew.io"
  },
  {
    "firstName": "Cecelia",
    "lastName": "Stokes",
    "age": 30,
    "address": "1809 Burim Park",
    "email": "hodak@ver.pe"
  }
]

export const externalResource = [{ "id": 1, "razon social": "FIUBA", "CUIT": "20-12345678-2" }, { "id": 2, "razon social": "FSOC", "CUIT": "20-12345678-5" }, { "id": 3, "razon social": "Macro", "CUIT": "20-12345678-3" }]
export const prioridades = [{ id: 1, valor: "Baja" }, { id: 2, valor: "Media" }, { id: 3, valor: "Alta" }, { id: 4, valor: "Critica" }]

export const product = [
  { id: 1, name: "PSA Spring ERP" },
  { id: 2, name: "PSA Spring CRM" },
  { id: 3, name: "PSA Business Analytics" }
]

export const productVersion = [
  { id: 1, name: "Version 1", productId: 1, state: "Active" },
  { id: 2, name: "Version 2", productId: 1, state: "Active" },
  { id: 3, name: "Version 2000", productId: 2, state: "Active" },
  { id: 4, name: "Version 1.0.2", productId: 3, state: "Active" },
]

export const productLicense = [
  { id: 1, productId: 1, versionId: 1, clientId: 1, state: "Active" },
  { id: 2, productId: 1, versionId: 2, clientId: 1, state: "Active" },
  { id: 3, productId: 2, versionId: 3, clientId: 1, state: "Active" },
  { id: 4, productId: 3, versionId: 4, clientId: 1, state: "Active" },
]

export const defaultTicketData = {
  title: "",
  description: "",
  status: "Abierto",
  priority: 1,
  productId: 0,
  productLicenseId: 0,
  authorId: 0,
  internal: true
}
