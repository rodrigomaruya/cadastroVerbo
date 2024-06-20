import api from "./api/api";
import Editar from "./components/edit";
import { useEffect,useRef,useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";



function App(){
  const [getVerbos,setGetVerbos]=useState([])
  const [buscar,setBuscar]=useState('')
  const refPortugues=useRef(null)
  const refRomaji=useRef(null)
  const refHiragana=useRef(null)
  const [selectVerbo,setSelectVerbo]=useState('vazio')
  const [open,setOpen]=useState(false)
  const [editando,setEditando]=useState()

  async function salvar(){
    if(refPortugues.current.value==''|| refRomaji.current.value=='' || refHiragana.current.value=='' || selectVerbo =='vazio'){
      return alert('Preencha todos os campos')
    }
   try{
    const response=await api.post('/create',{
      portugues:refPortugues.current.value,
      romaji:refRomaji.current.value,
      hiragana:refHiragana.current.value,
      grupo:selectVerbo
    })
    setGetVerbos(getAll=>[...getAll,response.data])
   }catch(erro){
    console.log('erro no post')
   }
   refPortugues.current.value=""
   refHiragana.current.value=""
   refRomaji.current.value=""
  }

  const deletar=async(id)=>{
    try{
      await api.delete(`/deletar/${id}`)
      const allDeletar=getVerbos.filter(filter=>filter._id!=id)
     
      setGetVerbos(allDeletar)
    }catch(error){
      console.log('erro no deletar')
    }
  }

  const updateItem = (id, portugues,romaji,hiragana) => {
    setGetVerbos(getVerbos.map(item => item.id === id ? {...item,portugues:portugues,romaji:romaji,hiragana:hiragana}: item));
  
  };

  useEffect(()=>{
    const get=async()=>{
      try{
        const response=await api.get('/')
        
        setGetVerbos(response.data)
         
      }catch(error){
        console.log('erro no get')
      }
    }
    get()
  },[getVerbos])

  const editar=async(id,portugues,romaji,hiragana)=>{
    setOpen(!open)
    let verbos={
      id:id,
      portugues:portugues,
      romaji:romaji,
      hiragana:hiragana
    }
    setEditando(verbos)
   
    
  }
 
  
  const lowBusca=buscar.toLowerCase()
  const buscarVerbos=getVerbos.filter(filtrar=>filtrar.portugues.toLowerCase().startsWith(lowBusca))

  


  return(
    <div className="w-full min-h-screen bg-slate-800 flex items-center font-bold flex-col">
      <div className="w-full max-w-5xl  h-full flex justify-center flex-col items-center mt-8 p-3 ">
        <h1 className="text-2xl text-white mb-8">Cadastro</h1>


        <div className="w-full flex flex-col justify-start items-start md:items-center">
          <span className="text-white">Português</span>
          <input type="text" ref={refPortugues} className="mb-3 mt-1 p-2 rounded-sm outline-none max-w-xl w-full"/>
          <span className="text-white">Romanji</span>
          <input type="text" ref={refRomaji} className="mb-3 mt-1 p-2 rounded-sm outline-none max-w-xl w-full"/>
          <span className="text-white">Hiragana</span>
          <input type="text" ref={refHiragana} className="mb-3 mt-1 p-2 rounded-sm outline-none max-w-xl w-full"/>
        </div>

        <div className="w-full mb-5 flex items-center justify-start gap-5 md:justify-center">
            <span className="text-white">Selecione o Grupo</span>
            <select value={selectVerbo} onChange={(e)=>setSelectVerbo(e.target.value)} className="text-black p-2 rounded-sm">
            <option value="vazio">Escolher o Grupo</option>
            <option value="Grupo 1">Verbo Grupo 1</option>
            <option value="Grupo 2">Verbo Grupo 2</option>
            <option value="Grupo 3">Verbo Grupo 3</option>
            <option value="Adjetivo-NA">Adjetivo-NA</option>
            <option value="Adjetivo-I">Adjetivo-I</option>
          </select>
        </div>

        <div>
          <button onClick={salvar} className="bg-white w-40 p-2 rounded mb-5">Registrar</button>
        </div>
      </div>

        <div className="flex flex-col justify-around w-full max-w-5xl gap-1 p-2 md:flex-row">
          <div className="flex justify-center ">
            <h2 className="text-center text-white ">Verbos</h2>
            <span className="text-white">({getVerbos.length})</span>
          </div>
          <div className="flex">
            <span className="text-white mr-2">Buscar</span>
            <input type="text" name="Buscar"  className="p-1 rounded" value={buscar} onChange={(e)=>setBuscar(e.target.value)}/>
          </div>
        </div>

      <div className="w-full  max-w-5xl max-h-96 mt-2 p-2 flex flex-col overflow-y-auto ">
        {buscarVerbos.map((get)=>(
          <div className="w-full text-black p-1 border  mt-2 bg-white flex flex-1 justify-center gap-2 items-center " key={get._id}>
            <p className="p-1 w-full flex-1 text-xs text-center md:text-sm">{get.portugues}</p>
            <p className="p-1 w-full flex-1 text-xs text-center  md:text-sm">{get.romaji}</p>
            <p className="p-1 w-full flex-1 text-xs text-center  md:text-sm">{get.hiragana}</p>
            <p className="p-1 w-full flex-1 text-xs text-center  md:text-sm">{get.grupo}</p>
            <div className="p-1  flex justify-center items-center  text-xs text-center gap-2">
              <FaTrash size={15} onClick={()=>deletar(get._id)}/>
              <CiEdit size={20} onClick={()=>editar(get._id,get.portugues,get.romaji,get.hiragana)}/>
            </div>
          </div>
          ))}
      </div>
        {open && (
          <Editar fechar={()=>setOpen(!open)} editando={editando} verbos={updateItem} />
        )}
    </div>
  )
}

export default App
