// index.tsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Типы данных
interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Инициализация состояния компонента с учетом переданных значений
    this.state = {
      paramValues: props.model.paramValues || [],
    };
  }

  // Обновление значения параметра в состоянии компонента
  private updateParamValue = (paramId: number, value: string) => {
    const { paramValues } = this.state;
    const updatedParamValues = paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );

    this.setState({ paramValues: updatedParamValues });
  };

  // Получение полной структуры модели
  public getModel(): Model {
    return { paramValues: this.state.paramValues };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {/* Вывод параметров для редактирования */}
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
              onChange={(e) => this.updateParamValue(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

const root = document.getElementById('root');
const params: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
};


ReactDOM.render(
  <React.StrictMode>
    <ParamEditor params={params} model={model} />
  </React.StrictMode>,
  root
);
