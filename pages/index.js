import React from 'react';
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/BjjkutCommons.js';
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";


function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.mainUser}.png`} style={{ borderRadius: "8px" }} />
      <hr/>
      <p>
        <a
          className="boxLink" href={`https://instagram.com/${props.mainUser}`}>@{props.mainUser}
        </a>
      </p>
      <a className="boxFaixa">• {props.faixa}</a>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {props.title} ({props.items.length})
            </h2>

            <ul>
              {/* {{props.items.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual.login}`}>
                      <img src={`https://github.com/jguibrandao.jpg`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>  
                )
              })} */}
            </ul>
          </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  let i = 0;
  let faixa = "Faixa Azul";
  const mainUser = "jguibrandao";
  const amigosDaComunidade = ["saiyajinjiujitsu", "ramosricardo21", "jiujitsu_profbabi"]
  const [comunidades, setComunidades] = React.useState([{
    id: "189273190120",
    title: "fbsinistro",
    image: "https://i.imgur.com/MPbUBD0.jpg"
  },
  {
    id: "1923871298379182",
    title: "jiuchipsoficial",
    image: "https://jiuchips.com.br/wp-content/uploads/elementor/thumbs/Jiu_Chips-ozt667frzuvuok5pfspiuvx5tfxszf32dpwso6xkbe.png"
  },
  {
    id: "1012093810923009132",
    title: "audazjiujitsu",
    image: "https://i.imgur.com/meYThdP.jpg"
  }
]);

  const imgsAmigos = [
    "https://i.imgur.com/FOky901.jpg",
   " https://i.imgur.com/W422CW5.png",
    "https://i.imgur.com/Uj8qw3Z.jpg" 
  ]

  const [followers, setFollowers] = React.useState([]);
 
  React.useEffect(function() {
    
    fetch("https://www.instagram.com/jguibrandao/followers/")
    .then(function(respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setFollowers(respostaCompleta);
    })
  }, [])

  return (
    <>
    <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar mainUser={mainUser} faixa={faixa}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
            Bem vindo(a)
            </h1> 

            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className="subTitle">O que voçê deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(evento) {
              evento.preventDefault();
              const dadosDoForm = new FormData(evento.target);
              
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get("title"),
                image: dadosDoForm.get("image")
              }

              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
            }} >
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text" />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usar de capa" 
                name="image" 
                aria-label="Coloque uma URL para usar de capa"/>
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
        <ProfileRelationsBox title="Seguidores" items={followers} />
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({amigosDaComunidade.length})
            </h2>

            <ul>
              {amigosDaComunidade.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://instagram.com/${itemAtual}`}>
                      <img src={`${imgsAmigos[i]}`} />
                      {i++}
                      <span>{itemAtual}</span>
                    </a>
                  </li>  
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`https://instagram.com/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>  
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>          
        </div>
      </MainGrid>
    </>
  )
}
