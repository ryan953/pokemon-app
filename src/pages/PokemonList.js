import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTANT } from '../helper';
import history from '../history';


import {PokemonAction} from '../redux/action/PokemonAction';

class PokemonList extends Component {
  constructor(props) {
    super(props)
    this.state = { unittestdata: {}};

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  fetchPokemonList(next) {
    this.props.dispatch(PokemonAction.fetchPokemonList(next));
  }

  componentDidMount() {
    this.fetchPokemonList("");
  }

  componentWillReceiveProps(props)
  {
    this.setState({unittestdata:props.PokemonDetail});
  }

  handleSearchInput(e) {
    e.preventDefault();
    this.setState({search: e.target.value})
  }

  handleSearch(e) {
    e.preventDefault();
    history.push("/pokemon-detail/" + this.state.search);
    this.setState({search: undefined});
  }

  render() {
    return (
        <div>
          <div className="pull-right">
            <form action="GET" onSubmit={this.handleSearch} className="form-inline form-search">
              <div className="has-feedback">
                <input type="text" className="form-control" onChange={this.handleSearchInput} placeholder="Search..." />
                <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
              </div>
            </form>
          </div>
          <h3>Show {this.props.PokemonList.results.length} of {this.props.PokemonList.count} Pokemons</h3>
          <table className="table table-striped table-pokemondetail">
              <tbody>
                {
                  this.props.PokemonList.results.map((data)  =>
                  {
                     let split = data.url.split("/");
                     let id = split[split.length - 2];
                      let imgUrl = CONSTANT.IMAGE_URL + id + ".png";
                      return (<tr>
                        <td className="middle" width="20"><a className="td_id" href={`/pokemon-detail/${id}`}>#{id}</a></td>
                        <td onClick={()=>{ history.push("/pokemon-detail/" + data.name) }} className="middle" width="40"><img height="45" src={imgUrl} /></td>
                        <td onClick={()=>{ history.push("/pokemon-detail/" + data.name) }} className="middle" >{data.name}</td>
                      </tr> )
                  })
                }
              </tbody>
          </table>
          <div className="loadmore" style={{display:this.props.PokemonList.results.length < this.props.PokemonList.count ? "block" : "none"}} onClick={()=>{
            if(this.props.PokemonList.results.length < this.props.PokemonList.count)
               this.fetchPokemonList(this.props.PokemonList.next);
          }} >Load more..</div>
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
      return {
        PokemonList:state.pokemon.PokemonList,
      };
  }

export default connect(mapStateToProps)(PokemonList);
  