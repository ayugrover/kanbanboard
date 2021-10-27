import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      taskName : " ",
      tasks: [
            { name: 'Task1', stage: 0 },
            { name: 'Task2', stage: 0 }, 
          ]    
    };

    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.timeout =  0;
  }
  
  
  handleChange = (e) =>{
    var val = e.target.value;
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({taskName : val}); 
    }, 300);
  }

  createTask = () =>{
    if(this.state.taskName !== " "){
      const task = {name: this.state.taskName, stage: 0}
      
      this.setState({
        tasks: [...this.state.tasks, task]
      }); 
      console.log(this.state.tasks);
    }
  }

  onClickBack = (e) =>{
    var tasks = [...this.state.tasks];
    var ele = tasks.findIndex(element => element.name === e.currentTarget.id);
      if(tasks[ele].stage >= 1){
          tasks[ele].stage -= 1;
          this.setState({tasks});
      }
  }

  
  onClickForward = (e) =>{
  console.log(e);
  var tasks = [...this.state.tasks];
  var ele = tasks.findIndex(element => element.name === e.currentTarget.id);
    if(tasks[ele].stage < 3){
        tasks[ele].stage += 1;
        this.setState({tasks});
    }
  };

  onClickDelete = (e) =>{
    var tasks = [...this.state.tasks];
    var ele = tasks.findIndex(element => element.name === e.currentTarget.id);
      tasks.splice(ele,1);
      this.setState({tasks});
    console.log("deleted");
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }

    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" onChange={this.handleChange}/>
          <button type="submit" className="ml-30" data-testid="create-task-button" onClick={this.createTask}>Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button id={task.name} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} onClick={this.onClickBack} disabled={task.stage === 0? true : false}>
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button id={task.name} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} onClick={this.onClickForward} disabled={task.stage === 3? true : false}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button id={task.name} className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={this.onClickDelete}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}