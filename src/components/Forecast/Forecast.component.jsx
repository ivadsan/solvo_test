import React from 'react'
import Card from '../Card/Card.component'
import styles from './Forecast.module.scss'

export default function Forecast({forecast}) {
    
  return (
    <div className={styles.forecast}>
        {forecast.length > 0 && forecast.map((item, index)=>{
            return <Card key={'card' + index} data={item} />
        })}
    </div>
  )
}
