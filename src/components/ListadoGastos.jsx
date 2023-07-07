import React from 'react'
import Gasto from './Gasto'
import { element } from 'prop-types'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  return (
    <div className='listado-gastos contenedor'>
        

        {
          filtro ? (
            <>
              <h2>{ gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta categoria'}</h2>
              {gastosFiltrados.map(gasto => (
                <Gasto 
                    setGastoEditar={setGastoEditar}
                    key={gasto.id}
                    gasto={gasto}
                    eliminarGasto={eliminarGasto}
                />
              ))}
            </>
          ) : (
            <>
              <h2>{ gastos.length ? 'Gastos' : 'No Hay Gastos aun'}</h2>
              {gastos.map(gasto => (
              <Gasto 
                  setGastoEditar={setGastoEditar}
                  key={gasto.id}
                  gasto={gasto}
                  eliminarGasto={eliminarGasto}
              />
              ))}
            </>
            
          )
        }

    </div>
  )
}

export default ListadoGastos