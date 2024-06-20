import { useRef } from "react"
import { IoExitOutline } from "react-icons/io5";
import PropTypes from 'prop-types';
import api from "../api/api";

function Editar({fechar,editando,verbos}){

	const refPortugues=useRef(null)
  const refRomaji=useRef(null)
  const refHiragana=useRef(null)
	

	const editar=async()=>{
		try{
			await api.put(`/update/${editando.id}`,{
				portugues:refPortugues.current.value,
				romaji:refRomaji.current.value,
				hiragana:refHiragana.current.value
			})
			let verboAtualizado={
				id:editando.id,
				portugues:refPortugues.current.value,
				romaji:refRomaji.current.value,
				hiragana:refHiragana.current.value
			}
			verbos(verboAtualizado.id,verboAtualizado.portugues,verboAtualizado.romaji,verboAtualizado.hiragana)

		
		}catch(error){
			console.log('erro no put')
		}
		refPortugues.current.value=""
		refRomaji.current.value=""
		refHiragana.current.value=""

		fechar()
	}


	return(
		<div className="w-full h-full bg-black/65 absolute top-0 left-0 flex justify-center items-center flex-col">
			<div className="w-full flex flex-col justify-start items-start md:items-center bg-slate-900 p-2">
			<div className="w-full max-w-xl flex justify-end">
				<IoExitOutline color="white" size={30} onClick={fechar}/>
			</div>

				<span className="text-white">Português</span>
				<input type="text" ref={refPortugues} defaultValue={editando.portugues} className="mb-3 mt-1 p-2 rounded-sm outline-none max-w-xl w-full"/>
				<span className="text-white">Romanji</span>
				<input type="text" ref={refRomaji} defaultValue={editando.romaji} className="mb-3 mt-1 p-2 rounded-sm outline-none max-w-xl w-full"/>
				<span className="text-white">Hiragana</span>
				<input type="text" ref={refHiragana} defaultValue={editando.hiragana} className="mb-3 mt-1 p-2 rounded-sm outline-none max-w-xl w-full"/>
				<div>
					<button className="bg-white py-2 px-5 rounded-lg" onClick={editar}>Editar</button>
				</div>
			</div>

		</div>
	)

}

Editar.propTypes={
	fechar:PropTypes.func.isRequired,
	editando:PropTypes.object.isRequired,
	verbos:PropTypes.func.isRequired
}
export default Editar