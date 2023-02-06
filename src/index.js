import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*

  ATIVIDADES:
    1º Correção de bugs.
      - Ao remover itens da lista o índice erraddo é removido.
    
    2º Limpar campos após inserção.
      - Após inserir dados na lista os campos continuam preenchidos, precisam ser resetados.
      
    3º Modularização do código.
      - Separar em módulos da melhor maneira baseado em sua experiência em desenvolvimento
      para tornar o código mais acessível para atualizações e correções.

*/

class DynamicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [
        {
          name: 'Toni',
          surname: 'Rodrigues',
          career: 'Desenvolvedor',
          email: 'antonio.rodrigues@power2go.com.br',
          id: 0
        },
        {
          name: 'Vitor',
          surname: 'Fraga',
          career: 'Desenvolvedor',
          email: 'vitor.fraga@power2go.com.br',
          id: 1
        },
        {
          name: 'Alexandre',
          surname: 'Nicolau',
          career: 'Desenvolvedor',
          email: 'nicolau@power2go.com.br',
          id: 2
        },
        {
          name: 'Fulano',
          surname: 'Beltano',
          career: 'Coordenador',
          email: 'fulano.beltrano@power2go.com.br',
          id: 3
        },
      ]
    };

    this.nameRef = React.createRef(null);
    this.surnameRef = React.createRef(null);
    this.careerRef = React.createRef(null);
    this.emailRef = React.createRef(null);
  }

  addLine() {
    const nameRefValue = this.nameRef.current.value;
    const surnameRefValue = this.surnameRef.current.value;
    const careerRefValue = this.careerRef.current.value;
    const emailRefValue = this.emailRef.current.value;

    let tableDataTemp = this.state.tableData;

    tableDataTemp.push({
      name: nameRefValue,
      surname: surnameRefValue,
      career: careerRefValue,
      email: emailRefValue,
      id: this.state.tableData.length
    })

    this.setState({
      tableData: tableDataTemp
    })
  }

  removeLine(id) {
    let newData = [];

    this.state.tableData.map((item, index) =>
      id == index ? null : 
      newData.push({
        ...item,
        id: index >= item.id ? item.id - 1 : item.id
      })
    );

    this.setState({ tableData: newData });
  }

  render() {
    const { tableData } = this.state;

    return (
      <section className="screen">
        <form onSubmit={event => {
          event.preventDefault();
          this.addLine();
        }}>
          <input
            type="text"
            ref={this.nameRef}
            placeholder="Nome"
          />

          <input
            type="text"
            ref={this.surnameRef}
            placeholder="Sobrenome"
          />

          <input
            type="text"
            ref={this.emailRef}
            placeholder="E-mail"
          />

          <input
            type="text"
            ref={this.careerRef}
            placeholder="Profissão"
          />

          <input type="submit" value="Adicionar" />
        </form>

        <table>
          <tr>
            <th style={{ width: '25%' }}>NOME</th>
            <th style={{ width: '25%' }}>SOBRENOME</th>
            <th style={{ width: '20%' }}>E-MAIL</th>
            <th style={{ width: '20%' }}>PROFISSÃO</th>
            <th style={{ width: '10%' }}>AÇÕES</th>
          </tr>

          {
            tableData.map((item, index) =>
              <tr>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.email}</td>
                <td>{item.career}</td>
                <td style={{ padding: 0 }}>
                  <button className="remove-btn" onClick={() => this.removeLine(item.id)}>
                    REMOVER
                  </button>
                </td>
              </tr>
            )
          }
        </table>

        {
          tableData.length == 0 && <div className="empty-table">nenhum dado inserido na tabela</div>
        }
      </section>
    );
  }
}

root.render(
  <React.StrictMode>
    <DynamicTable />
  </React.StrictMode>
);
