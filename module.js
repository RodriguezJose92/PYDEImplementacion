/* Peticion SeverMudi */
async function serverData ({
    token = undefined,
    sku = undefined
  }) {
  
    // Errores
    if (token == null) { console.error('Error Mudi: Token Api Null') ;  return }
    if ( sku == null)  { console.error('Error Mudi: SKU Null') ;  return}
  
    // Respuesta positiva 
    let contentBody = { "skus": [`${sku}`] }
  
    const req = await fetch ('https://mudiview.mudi.com.co:7443/product/getProductsUrl' , {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'tokenapi':token
      },
      body: JSON.stringify(contentBody)
    })
  
    const jsonResponse = await req.json();
    const finalResponse = jsonResponse.data[0];
  
    return finalResponse;
  
  };
  
  /** Creamos Los estilos remotos */
  function createStyles({idCompany}){
    const link = document.createElement('LINK');
    link.setAttribute('rel','stylesheet');
    link.id="stylesMudiGeneral";
    link.href=`https://mudi.com.co/module/mudi/index-${idCompany}.css`; /* Pueden tomarlos de esta ruta */
   
    document.head.appendChild(link)
  };
  
  /** Cuando se obtiene una respuesta positiva del server se crean dos botones ( btn3D y btnAR ) */
  function createBtns({father,sku,idCompany,link3D,color,zBtns,zModal,ButtonsY}){

    let typeDevice = null;

    if(window.innerWidth > 1020){
      typeDevice='DESK';
      father=document.querySelector('section > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div > div > div');
    }
    else if (window.innerWidth > 500 && window.innerWidth < 1920)typeDevice='TABLET'
    else {
      typeDevice='MOBILE';
      father=document.querySelector('div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div');
    };
  
    const fatherContainer = father;
  
    // Creacion del contenedor principal para los botones
    const containerPrincipalBtns = document.createElement('DIV');
    containerPrincipalBtns.classList.add('ContainerBtnsMudi');
    containerPrincipalBtns.id="containerBtnsMudi";
    containerPrincipalBtns.setAttribute('style',`z-index:${zBtns}; ${ButtonsY}:0`)
    
    containerPrincipalBtns.innerHTML=`
    <div class="tooltip showTooltipInit">
      <p><b>¡Nuevo!</b> prueba nuestras experiencias de 3D y Realidad Aumentada</p>
    </div>
    <img src="https://mudi.com.co/cliente/${idCompany}/btn3D.webp" alt="Boton Mudi para activar 3D" class="btnMudi3D" id="btnMudi3D" sku=${sku} title="Haz click para tener una experiencia 3D">
    <img src="https://mudi.com.co/cliente/${idCompany}/btnAR.webp" alt="Boton Mudi para activar AR" class="btnMudiAR" id="btnMudiAR" sku=${sku} title="Haz click para tener una experiencia de realidad aumentada">`;
    
    containerPrincipalBtns.querySelector('.btnMudi3D').addEventListener('click',()=>{ createModal3D({link3D:link3D,color:color,zModal:zModal}) },false);
    containerPrincipalBtns.querySelector('.btnMudiAR').addEventListener('click',()=>{ createModalAR({color:color, idCompany:idCompany, sku:sku,zModal:zModal}) },false);
  
    if(typeDevice==='DESK'){
      const elementoHermano = document.querySelector('div.vtex-store-components-3-x-carouselGaleryThumbs.vtex-store-components-3-x-carouselGaleryThumbs--swipper-block.dn.h-auto.mt3.db-ns');
      fatherContainer.insertBefore(containerPrincipalBtns , elementoHermano);
    }else if( typeDevice ==='TABLET'){
      console.warn('No hay contenedores HTML para anidar la experiencia 3D y AR de MUDI')
    }else{
      const elementoHermano = document.querySelector('.vtex-store-components-3-x-carouselGaleryThumbs');
      fatherContainer.insertBefore(containerPrincipalBtns , elementoHermano);
    };    
  
    setTimeout(()=>{
      const tool = document.querySelector('.showTooltipInit');
      tool.classList.remove('showTooltipInit')
      tool.classList.add('hideTooltip')
    },10000)
  
  };
  
  /** Creamos el modal 3D */
  function createModal3D({link3D,color,zModal}){
  
    const div = document.createElement('DIV')
    div.classList.add('modalMudi')
    div.id="modalMudi";
    div.setAttribute('style',`z-index:${zModal}`);
    div.innerHTML=`
    <div class="contentModal3D">
      <h1 class="closeModal" style="color:${color}; text-align:end">X</h1>
      <iframe class="iframeMudi3D" src="${link3D}"></iframe>
      <a href="https://mudi.com.co" target="_blank">
        <img class="powerByMudi3D" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
      </a>
    </div>`;
  
    div.querySelector('.closeModal').addEventListener('click',()=>{
      document.body.querySelector('.modalMudi').remove();
    })
  
    document.body.appendChild(div);
  };
  
  /** Creamos el Modal AR */
  function createModalAR({color,idCompany,sku,zModal}){
    const div = document.createElement('DIV')
    div.classList.add('modalMudi')
    div.id="modalMudi";
    div.setAttribute('style',`z-index:${zModal}`);
    div.innerHTML=`
      <div class="contentModalAR">
          <h1 class="closeModal" style="color:${color}; text-align:end;">X</h1>
          <h2 class="modalTitleMudi">Recomendaciones para ver el producto en Realidad Aumentada.</h2>
  
          <div class="principalContentModalAR">
  
              <div class="fristContentMudi">
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step1.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Apunta tu teléfono al piso para ver el producto.</h3>
                          <p class="stepParagrahpMudi">Prueba otro espacio si no puedes ver el producto.</p>
                      </div>
                  </div>
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step2.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Desplaza para visualizar.</h3>
                          <p class="stepParagrahpMudi">Mueve tu dedo en la pantalla para rotar la imagen.</p>
                      </div>
                  </div>
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step3.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Amplia y detalla el producto.</h3>
                          <p class="stepParagrahpMudi">Controla el zoom arrastrando dos dedos en la pantalla de adentro hacia afuera.</p>
                      </div>
                  </div>
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step4.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Toca dos veces para restablecer.</h3>
                          <p class="stepParagrahpMudi">Vuelve al tamaño original haciendo doble click sobre el producto.</p>
                      </div>
                  </div>
  
                  <button class="initARMudi" style="background-color:${color};">Iniciar AR</button>
  
              </div>
  
              <div class="secondContentMudi">
                  <h3 class="stepTitleMudi qrTitlePart"> Escanea el codigo QR para ver el producto en realidad aumentada.</h3>
                  <div class="containerQRMudi">
                    <img src="https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=https%3A%2F%2Fviewer.mudi.com.co%2Fv1%2Far%2F%3Fid%3D${idCompany}%26sku%3D${sku}" class="codeQRMudi">
                  </div>
                  <a class="hrefMudiAR" href="https://mudi.com.co" target="_blank">
                    <img class="powerByMudiAR" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
                  </a>
              </div>
  
          </div>
  
      </div>`;
  
      div.querySelector('.closeModal').addEventListener('click',()=>{
        document.body.querySelector('.modalMudi').remove();
      });
  
      div.querySelector('.initARMudi').addEventListener('click',()=>{
        window.open(`https://viewer.mudi.com.co/v1/ar/?id=${idCompany}&sku=${sku}`)
      })
  
      document.body.appendChild(div);
  };
  
  /**Envío de data DataLayer */
  function sendDataLayer({sku}){

    let OSdevice;

    if(navigator.userAgent.includes('Android')) OSdevice='Android';
    else if ( navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) OSdevice="IOS";
    else OSdevice='DESK';

    /** Evento de visualizacion */
    dataLayer.push({
        event:'Evento de visualizacion Mudi',
        valorMudi:1,
        sku:sku,

        categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a').innerHTML : 'null',

        subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML : 'null',

        seccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',

        subSeccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a').innerHTML :'null',

        sistemaOperativo:OSdevice
    });

    /** Evento de intencion de compra */
    if (OSdevice ==='DESK'){
      document.querySelector('body > div.render-container.render-route-store-product > div > div > div.vtex-store__template.bg-base > div > div > div > div:nth-child(4) > div > div:nth-child(2) > div > section > div > div:nth-child(3) > div > div:nth-child(8) > div > div > div > div > div > div > div > button > div').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de intencion de compra Mudi',
            valorMudi:1,
            sku:sku,

            categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a').innerHTML : 'null',

            subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML : 'null',
    
            seccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',
    
            subSeccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a').innerHTML :'null',

            sistemaOperativo:OSdevice
        })
      },false);
    }else{
      document.querySelector('body > div.render-container.render-route-store-product > div > div > div.vtex-store__template.bg-base > div > div > div > div:nth-child(3) > div > div:nth-child(3) > div > section > div > div:nth-child(3) > div > div:nth-child(8) > div > div > div > div > div > div > div > button > div').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de intencion de compra Mudi',
            valorMudi:1,
            sku:sku,
            categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a').innerHTML : 'null',

            subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML : 'null',

            seccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',

            subSeccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a').innerHTML :'null',

            sistemaOperativo:OSdevice
        })
      },false);
    }
   

    /** Evento de interacion AR Mudi */
    document.getElementById('btnMudiAR').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de interaccion AR Mudi',
            valorMudi:1,
            sku:sku,

            categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a').innerHTML : 'null',

            subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML : 'null',

            seccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',

            subSeccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a').innerHTML :'null',

            sistemaOperativo:OSdevice
        })
    },false);

    /** Evento de interacion 3D Mudi */
    document.getElementById('btnMudi3D').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de interaccion 3D Mudi',
            valorMudi:1,
            sku:sku,
            
            categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a').innerHTML : 'null',

            subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML : 'null',

            seccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',

            subSeccion:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--4.ph2.c-muted-2 > a').innerHTML :'null',

            sistemaOperativo:OSdevice
        })
    },false);

  };
  
  // Funcion Main Mudi --
  async function MudiExperience ({
    tokenApi,
    skuNumber,
    containerBtns,
    idCompanyMudi,
    color,
  
    zIndexBtns=1,
    zIndexModal=1,
  
    positionBtnsY='bottom',
  }) {
  
    const server = await serverData( {token:tokenApi, sku:skuNumber} );
    if(server==undefined){ console.warn(`El producto identificado con el SKU: "%c${skuNumber}%c" en Mudi 3D&AR Commerce, no tiene 3D ni AR`, 'color: red; font-weight: bold', 'color: black;'); return };
  
    /** Una vez tengamos la respuesta positiva creamos los estilos generales y los botones */
    createStyles({idCompany:idCompanyMudi});
    createBtns({ father:containerBtns, sku:skuNumber, idCompany:idCompanyMudi, link3D:server.URL_WEB ,color:color, zBtns:zIndexBtns,zModal:zIndexModal, ButtonsY:positionBtnsY});
    sendDataLayer({sku:skuNumber})
  };

setTimeout(()=>{
    MudiExperience({
    tokenApi:'lUYijFmIfhozdOfqKvkV',
    skuNumber:document.querySelector('.vtex-product-identifier-0-x-product-identifier__value').innerHTML,
    idCompanyMudi:'pyde',
    color:'#008081',
    zIndexModal:1000,
  });
},2000)
  
