(function () {
    const tBody = document.querySelector('#listado-clientes');
    const volver = document.querySelector('#volver');
    let DB;

    document.addEventListener('DOMContentLoaded', ()=>{
        crearDB();

        if (window.indexedDB.open('crm', 1)) {
        }

    }); 
    tBody.addEventListener('click',eliminarCliente);
    volver.addEventListener('click',()=>{window.location = '/'});
    function eliminarCliente(e){
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente) ;
            console.log(e.target.parentElement.parentElement.children[0].children[0].textContent);
            const td = document.querySelector('td');
            const nombre = td.firstElementChild.textContent;
            const email = td.children[1].textContent;
            // con nth-child busca todos los elementos de ese tipo            
            const empresa = document.querySelector('td:nth-child(3)').textContent;
              //console.log(empresa.trim());

            const confirmar = confirm(`Deseas eliminar a Nombre:${nombre} Email: ${email}?`);

            if(confirmar){
                const transaction = DB.transaction(['crm'],`readwrite`);
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.onerror = () =>{
                   
                }

                transaction.oncomplete = () =>{
                   e.target.parentElement.parentElement.remove();
                }
            }
        }
    }
       

    function crearDB() {

        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = () => {
            console.log('Ha ocurrido un error al crear la bdd')
        }

        crearDB.onsuccess = () => {

            DB = crearDB.result;
            console.log('Se ha creado la bdd con éxito')
            //me ahorro abrir la conexion y la llamo desde aqui :)
            imprimirCliente();
        }

        crearDB.onupgradeneeded = (e) => {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true,
            });

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', `id`, { unique: true });

            console.log('Db lista y creada')

        }
    }

    function imprimirCliente() {


        const objectStore = DB.transaction('crm').objectStore('crm');


   /*    
        como contar los elemetos de la bdd
   const total = objectStore.count();
        let totalCount;
        total.onsuccess = () => {
            totalCount = total.result;
            console.log(total.result);
        } */
        objectStore.openCursor().onsuccess = function (e) {


            const cursor = e.target.result;
           

            if (cursor) {

                const { nombre, email, telefono, empresa, id } = cursor.value;
              
                let idHtml = 'cliente.html?id';
                tBody.innerHTML += ` 
                <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="editar-${idHtml}=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                    </td>
                </tr>
        `;
                //para que al iterar pase al siguiente dato
                cursor.continue();
            }
        }
    }

})();