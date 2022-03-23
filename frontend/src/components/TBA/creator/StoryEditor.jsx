import React, { Component } from 'react'

import ObjectID from "bson-objectid"

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {

            id: '1',
            nodes :[
                {
                    id: '1',
                    nodeName: 'startStory!',
                    body: 'you awake in the morning, get ready for work. u see a knife on the ground',
                    connections: [
                        {
                            id:'2',
                            nodeName: 'pick up knife'
                        },
                        {
                            id:'3',
                            nodeName: 'go to work'

                        }
                    ]

                },
                {
                    id: '2',
                    nodeName: 'pick up knife',
                    body: 'u pick up the knife',
                    connections: []
                },
                {
                    id: '3',
                    nodeName: 'go to work',
                    body: 'u go to work',
                    connections: []
                },
            ],
            checked: false,
            name: '',
            body: '',
            connectId: ''

        }
    }

    handleChecked = () => {
        this.setState((prevState) => ({
            checked: !prevState.checked
        }))
    }

    changeCurrentNode = (id) => {
        if(id !== this.state.id) {
            this.setState({
                id: id
            })
        }

    }

    handleChangeBody = (e) => {
        const removeCurrent = this.state.nodes.filter(element => element.id !== this.state.id)
        let node = this.state.nodes.find(element => element.id === this.state.id)
        node.body = e.target.value
        this.setState({nodes:[...removeCurrent, node]})
    }

    handleChangeForm = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    removeNode = (id) => {
        const newNodes = this.state.nodes.filter(element => element.id !== id)
        newNodes.forEach(e => {
            e.connections = e.connections.filter(e => e.id !== id)
        })
        console.log(this.state.nodes)
        console.log(newNodes)
        this.setState({nodes: newNodes})


    }

    createNode = (e) => {
        e.preventDefault()

        if(!this.state.checked && this.state.name !== '') {
            const newNode = {
                id: ObjectID().toHexString(),
                nodeName: this.state.name,
                body: '',
                connections: []
            }
            const removeCurrent = this.state.nodes.filter(element => element.id !== this.state.id)
            let updateCurrent = this.state.nodes.find(element => element.id === this.state.id)
            updateCurrent.connections.push({
                id: newNode.id,
                nodeName: newNode.nodeName
            })
            const newNodes = [...removeCurrent,updateCurrent,newNode]

            this.setState({nodes: newNodes})


        }else{
            console.log('you made it!')

            const changedNodes = this.state.nodes.map(e => {
                if(e.id === this.state.id){
                    e.connections.push({
                        id: this.state.connectId,
                        nodeName: (this.state.nodes.find(e => e.id === this.state.connectId)).nodeName
                    })

                    return(e)
                }else{
                    return(e)
                }
            })
            this.setState({nodes: changedNodes})
        }
    }

    currentNode = () => {
        let node = this.state.nodes.find((element) => element.id === this.state.id)

        return(
            <div className='node-current'>
                <h1>{node.nodeName}</h1>
                <textarea value={this.state.nodes.find(e => e.id === this.state.id).body} onChange={this.handleChangeBody}/>
                <div className='connections'>
                    <div className='node-connections'>
                        <ul>
                            {node.connections.map((connection) => (
                                <li key={connection.id}>
                                    <p onClick={() => this.changeCurrentNode(connection.id)}>{connection.nodeName}</p>
                                    <button onClick={() => this.removeNode(connection.id)}>Delete node</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='add-node'>
                        <form onSubmit={this.createNode}>
                            <h2>Add connection</h2>
                            <label>
                                Existing node?
                            <input type='checkbox' value={this.state.checked} onChange={this.handleChecked}/>
                            </label>
                            {
                                this.state.checked ? (
                                    <label>
                                        Node name:
                                        <select name='connectId' onChange={this.handleChangeForm}>
                                            {this.state.nodes.filter(e => e.id !== node.id).map(nodeElement => (<option value={nodeElement.id}>{nodeElement.nodeName}</option>))}}
                                        </select>
                                    </label>
                                ) : (
                                    <>
                                    <label>
                                        Node name:
                                        <input type='text' name='name' onChange={this.handleChangeForm}/>
                                    </label>
                                    </>
                                )
                            }
                            <label>
                                Connect!
                                <input type='submit'/>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        )
    }




    allNodes = () => {
        return (
            <div className='node-list'>
                <h2>All nodes:</h2>
                <ul>
                    {this.state.nodes.map((node) => (

                        <li key={node.id} onClick={() => this.changeCurrentNode(node.id)}>{node.nodeName}</li>
                    ))}

                </ul>
            </div>
        )
    }


    render() {
        return (
            <>
                <h1>Currently working on: {this.props.storyName}</h1>
                <this.allNodes/>
                <this.currentNode/>
            </>

        )
    }
}


