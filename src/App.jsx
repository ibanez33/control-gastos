import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { number } from 'prop-types'



function App() {
 
  const [ presupuesto, setPresupuesto] = useState(
    localStorage.getItem('presupuesto') ?? 0
  )
  const [ isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)

  const [ gastos, setGastos ] = useState([
    ...(JSON.parse(localStorage.getItem('gastos')) ?? [])
  ])

  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])

  const [ gastoEditar, setGastoEditar ] = useState({})

  useEffect(() => {
    if( Object.keys( gastoEditar ).length > 0 ) {
      setModal( true )
      setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    }
  }, [ gastoEditar ])
  

  const handleNuevoGato = () => {
    setModal( true )
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  useEffect(() => {
    Number(localStorage.setItem('presupuesto', presupuesto)) ?? 0
  }, [presupuesto])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto', presupuesto)) ?? 0
    
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  
  useEffect(() => {
    if(filtro) {
      // filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  

  const guardarGasto = (gasto) => {
    
    if( gasto.id) {
      // Actualizar 
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id )

    setGastos(gastosActualizados)
  }

  return (
    <div className={ modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}

            />
            <ListadoGastos
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="Icono nuevo Gasto" onClick={handleNuevoGato} />
          </div>

        </>

      )}

      { modal && 
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      
      }
      
    </div>
  )
}

export default App
