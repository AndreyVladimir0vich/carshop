import React from 'react'
import './itemstable.scss'
import './shoppingcard.scss'
import { BaseButton } from '../BaseButton/BaseButton'

export const ItemsTable = ({
  result,
  items,
  removeItem,
  increaceCount,
  decreaceCount,
}) => (
  <>
    <table className="price-table">
      <thead>
        <tr>
          <th>Наименование товара</th>
          <th>Цена за шт</th>
          <th>Кол-во</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
              <button onClick={() => decreaceCount(item.id, item.count)}>
                -
              </button>
              <span className="count">{item.count}</span>
              <button onClick={() => increaceCount(item.id)}>+</button>
            </td>
            <td>{item.price * item.count}</td>
            <td>
              <button onClick={() => removeItem(item.id)}>Х</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="result-panel">
      <span>
        Общая стоимость: <span className="value">{result} у.е</span>
      </span>
      <BaseButton>Оформить</BaseButton>
    </div>
  </>
)
