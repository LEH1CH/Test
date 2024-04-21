import React, { ChangeEvent, FormEvent } from "react";

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface Color {}

interface State {
  model: Model;
}

const params: Param[] = [
  { id: 1, name: "Назначение" },
  { id: 2, name: "Длина" },
];

const model: Model = {
  colors: [],
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

class ParamEditor extends React.Component<Props, State> {
  state: State = {
    model: this.props.model,
  };

  getModel = (e: FormEvent<HTMLFormElement>): Model => {
    e.preventDefault();
    console.log("Модель", this.state.model);
    return this.state.model;
  };

  setModel = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState((prevState: State) => {
      const model = { ...prevState.model };
      const paramId: number = parseInt(e.target.name);
      model.paramValues[paramId - 1].value = e.target.value;
      return { model };
    });
  };

  render() {
    return (
      <form onSubmit={this.getModel}>
        {params.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <input
              name={`${item.id}`}
              autoFocus={true}
              value={this.state.model.paramValues[item.id - 1].value}
              onChange={this.setModel}
            />
          </div>
        ))}
        <button type="submit">Вывести модель</button>
      </form>
    );
  }
}

export default function App() {
  return <ParamEditor model={model} params={params} />;
}
