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

export const tasks = [{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62ab8729058abe44300395cf","priority":1,"name":"task2","description":" hoy es viernes","effort":8,"resource":0,"code":368,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62ab90e85c9d7e630adac9f5","priority":1,"name":"task3","description":" hello","effort":7,"resource":0,"code":369,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62ac861146adc7b8851277e0","priority":1,"name":"task4","description":" task 4","effort":4,"resource":0,"code":370,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62acc2edd8ea1867655cffa0","priority":1,"name":"task 5","description":" task 5","effort":4,"resource":0,"code":371,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b0a74464d980cf5528c69e","priority":0,"name":"Instalacion de MV Linux","description":" ","effort":9,"resource":1,"code":372,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b0de3dbef2e799be7c5b31","priority":1,"name":"task project 244","description":" ","effort":4,"resource":0,"project":244,"code":373,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b0de54bef2e799be7c5b34","priority":1,"name":"task recursos","description":" ","effort":4,"resource":0,"project":244,"code":374,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b0de69bef2e799be7c5b37","priority":1,"name":"task recursos","description":" ","effort":4,"resource":0,"project":244,"code":375,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b0deeabef2e799be7c5b3b","priority":1,"name":"task recursos","description":" ","effort":4,"resource":0,"project":244,"code":376,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b12312646881d3176687ef","priority":2,"name":"tarea de prueba","description":"descripcion de prueba","effort":5,"resource":0,"code":377,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b124ff646881d31766887b","priority":3,"name":"Tarea de prueba 2","description":"Tarea de prueba","effort":7,"resource":0,"code":378,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b12b4cf57223008e81c42b","priority":3,"name":"Tarea asociacio","description":"descp","effort":8,"resource":0,"projectCode":223,"code":382,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b12be3f57223008e81c42f","priority":2,"name":"Tarea de prueba","description":"tarea de prueba modificada","effort":9,"resource":1,"projectCode":223,"code":383,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b12c08f57223008e81c434","priority":2,"name":"tarea de prueba","description":"descripcion","effort":7,"resource":0,"projectCode":223,"code":384,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b12c42f57223008e81c438","priority":2,"name":"tarea de prueba","description":"tarea","effort":7,"resource":0,"projectCode":223,"code":385,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b12ff0f57223008e81c452","priority":2,"name":"tarea","description":"descp","effort":2,"resource":0,"projectCode":223,"code":391,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1301ef57223008e81c457","priority":1,"name":"t1","description":"d","effort":5,"resource":0,"projectCode":223,"code":392,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b13079f57223008e81c485","priority":2,"name":"tarea1","description":"de","effort":6,"resource":0,"projectCode":223,"code":393,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1309ef57223008e81c489","priority":2,"name":"tarea1","description":"descp","effort":6,"resource":0,"projectCode":223,"code":394,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1cf3477a34e8fa711adb5","priority":1,"name":"tarea 2","description":"descripcion","effort":8,"resource":0,"projectCode":223,"code":395,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1cf8277a34e8fa711adb9","priority":2,"name":"tarea 222","description":"t22","effort":7,"resource":0,"projectCode":223,"code":396,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1cfcb77a34e8fa711adbd","priority":4,"name":"tarea 222","description":"t22","effort":8,"resource":0,"projectCode":223,"code":397,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d02577a34e8fa711adcd","priority":4,"name":"tarea de prueba 5","description":"descripcion de tarea","effort":10,"resource":0,"projectCode":223,"code":398,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d09277a34e8fa711ade0","priority":4,"name":"BIG TASK","description":"des","effort":5,"resource":1,"projectCode":223,"code":400,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d12b77a34e8fa711ade6","priority":1,"name":"tarea de prueba alejandra","description":"decripcion de tarea de prueba","effort":1,"resource":0,"projectCode":223,"code":401,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d14477a34e8fa711adec","priority":2,"name":"tarea de prueba","description":"tarea","effort":6,"resource":0,"projectCode":223,"code":402,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d16f77a34e8fa711ae12","priority":2,"name":"tarea de prueba","description":"tarea","effort":7,"resource":0,"projectCode":223,"code":403,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d19c77a34e8fa711ae17","priority":2,"name":"tarea de prueba","description":"t","effort":7,"resource":0,"projectCode":223,"code":404,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d2f677a34e8fa711ae38","priority":2,"name":"task 89","description":"tarea media","effort":5,"resource":0,"projectCode":223,"code":405,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d2fe77a34e8fa711ae3d","priority":2,"name":"task 89","description":"tarea media","effort":5,"resource":0,"projectCode":223,"code":406,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d3ef77a34e8fa711ae5e","priority":4,"name":"tarea de prueba","description":"decripcion","effort":7,"resource":0,"projectCode":223,"code":407,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d40977a34e8fa711ae64","priority":2,"name":"tarea","description":"descp","effort":6,"resource":0,"projectCode":223,"code":408,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d41477a34e8fa711ae69","priority":2,"name":"tarea","description":"t3","effort":6,"resource":0,"projectCode":223,"code":409,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d57377a34e8fa711ccea","priority":2,"name":"tarea11","description":"tarea media","effort":5,"resource":0,"projectCode":223,"code":410,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d57e77a34e8fa711ccef","priority":2,"name":"tarea11","description":"t11","effort":5,"resource":0,"projectCode":223,"code":411,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d62277a34e8fa711e5a2","priority":2,"name":"t23","description":"tarea23","effort":6,"resource":0,"projectCode":223,"code":412,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d62d77a34e8fa711e5a7","priority":2,"name":"t23","description":"t45","effort":6,"resource":0,"projectCode":223,"code":413,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d67577a34e8fa711e676","priority":2,"name":"crear recursos","description":"crear recursos para el proyecto","effort":7,"resource":0,"projectCode":227,"code":414,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d6cf77a34e8fa711e67c","priority":2,"name":"eliminar recursos","description":"debe ser posible eliminar los recursos de un proyecto","effort":4,"resource":0,"projectCode":227,"code":415,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d70d77a34e8fa711e681","priority":2,"name":"modificar recursos","description":"debe ser posible modificar los recursos","effort":4,"resource":0,"projectCode":227,"code":416,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d79077a34e8fa711e68a","priority":2,"name":"agregar recursos","description":"agregar recursos al proyecto","effort":6,"resource":0,"projectCode":227,"code":417,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d7c477a34e8fa711e690","priority":2,"name":"agregar tarea","description":"agregar una tarea a un proyecto","effort":5,"resource":0,"projectCode":227,"code":418,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d86777a34e8fa711e695","priority":2,"name":"eliminar tarea","description":"eliminar tareas","effort":5,"resource":0,"projectCode":227,"code":419,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d89d77a34e8fa711e69b","priority":1,"name":"modificar tarea","description":"modificar una tarea","effort":6,"resource":0,"projectCode":227,"code":420,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1d8d177a34e8fa711e6a0","priority":1,"name":"setear tarea","description":"setear una tarea","effort":6,"resource":0,"projectCode":227,"code":421,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b1ff72e23b7af916cbbc25","priority":2,"name":"TAREA PRUEBA","description":"23","effort":0,"resource":0,"projectCode":223,"code":422,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20716e23b7af916cbc1ce","priority":0,"name":"Instalacion","description":" ","effort":9,"resource":1,"projectCode":12,"code":423,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20a4269d152e0c8268c26","priority":1,"name":"taskkk","description":" ","effort":0,"resource":2,"projectCode":223,"code":424,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20ad369d152e0c8268c31","priority":3,"name":" tarea","description":" ","effort":0,"resource":2,"projectCode":223,"code":425,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20b6e69d152e0c8268c48","priority":2,"name":" tarea","description":" ","effort":0,"resource":3,"projectCode":231,"code":426,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20ba469d152e0c8268c52","priority":2,"name":" tarea","description":" ","effort":0,"resource":2,"projectCode":231,"code":427,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20bf769d152e0c8268c59","priority":2,"name":" tarea","description":" ","effort":0,"resource":3,"projectCode":231,"code":428,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20c6069d152e0c8268c62","priority":4,"name":" DEPLOYAR","description":" ","effort":10,"resource":3,"projectCode":231,"code":429,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20d6669d152e0c8268c73","priority":3,"name":" DEPLOYAR","description":" ","effort":8,"resource":2,"projectCode":231,"code":430,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20f6c69d152e0c826927d","priority":3,"name":" DEPLOYAR","description":" ","effort":0,"resource":3,"projectCode":223,"code":431,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20fa669d152e0c82696e7","priority":4,"name":" strange","description":" ","effort":10,"resource":3,"projectCode":230,"code":432,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20fc269d152e0c8269934","priority":4,"name":" strange 2.0","description":" ","effort":9,"resource":3,"projectCode":230,"code":433,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b20fd169d152e0c8269a54","priority":4,"name":" strange 3.0","description":" ","effort":9,"resource":2,"projectCode":230,"code":434,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b217540e4ccb09ddcf948b","priority":3,"name":" DEPLOYAR","description":" ","effort":0,"resource":1,"projectCode":249,"code":435,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b2178a0e4ccb09ddcf9901","priority":2,"name":" strange","description":"w","effort":0,"resource":1,"projectCode":249,"code":436,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b217a80e4ccb09ddcf9c89","priority":2,"name":" tarea nueva","description":" ","effort":10,"resource":1,"projectCode":249,"code":437,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b219630e4ccb09ddcfccac","priority":3,"name":"AGREGADO","description":" ","effort":10,"resource":3,"projectCode":223,"code":438,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b219d00e4ccb09ddcfd752","priority":2,"name":" strange","description":" ","effort":0,"resource":2,"projectCode":223,"code":439,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b21fbe0e4ccb09ddd0549c","priority":4,"name":" big big","description":" ","effort":10,"resource":1,"projectCode":223,"code":440,"__v":0},{"projectCode":0,"isCompleted":0,"ticket":0,"_id":"62b2404a43e17114f4002123","priority":3,"name":"Intento","description":" ","effort":5,"resource":1,"code":441,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b26ab81db0e02bf29df1b8","priority":2,"name":" prueba de tareas","description":"prueba de tareas y testing","effort":3,"resource":2,"projectCode":225,"code":442,"__v":0},{"isCompleted":0,"ticket":0,"_id":"62b34be0edbdd84f13169b84","priority":3,"name":" tarea de prueba 20","description":"tarea descriptiva","effort":6,"resource":1,"projectCode":223,"code":443,"__v":0},{"_id":"62b371d4db4ff607f1f9416d","priority":3,"name":"tarea soporte","description":"tarea de soporte","effort":8,"resource":0,"projectCode":310,"isCompleted":0,"ticket":0,"code":444,"__v":0},{"_id":"62b3721edb4ff607f1f945c2","priority":3,"name":"tarea agregacion","description":"agregar recursos","effort":8,"resource":3,"projectCode":310,"isCompleted":0,"ticket":0,"code":445,"__v":0}]