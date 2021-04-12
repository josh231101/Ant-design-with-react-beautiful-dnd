import React from 'react'
import ReactDOM from 'react-dom'
import {Collapse} from 'antd'
import 'antd/dist/antd.css'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import initialState from './initialState'

const {Panel} = Collapse

function callback(key) {
  console.log(key)
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
class App extends React.Component {
  state = initialState
  onDragEnd = (result) => {
    console.log(result)

    const {destination, source, draggableId} = result
    if (!destination) {
      return
    }
    if (destination.index === source.index) {
      return
    }
    const newPanelOrder = Array.from(this.state.panelOrder)
    newPanelOrder.splice(source.index, 1) // removing the item
    newPanelOrder.splice(destination.index, 0, draggableId) // pushing in the new position
    console.log(newPanelOrder)

    return this.setState({
      ...this.state,
      panelOrder: newPanelOrder,
    })
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              style={{padding: '16px'}}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.panelOrder.map((panelId, index) => {
                const panelInfo = this.state.panels[panelId]
                console.log(panelInfo.id)

                return (
                  <Draggable
                    key={panelId}
                    draggableId={panelInfo.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                      >
                        <Collapse key={index}>
                          <Panel header={panelInfo.header} key={index + 1}>
                            <p>{panelInfo.text}</p>
                          </Panel>
                        </Collapse>
                      </div>
                    )}
                  </Draggable>
                )
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
