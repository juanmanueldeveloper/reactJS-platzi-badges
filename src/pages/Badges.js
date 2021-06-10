import React from 'react';
import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import {Link} from 'react-router-dom';
import api from '../api';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';
class Badges extends React.Component {
    constructor(props){
        super(props);
        console.log('1.- Constructor')
        this.state = {
            loading: true,
            error: null,
            data: undefined
        };
    }

    componentDidMount(){
        console.log('3.- componentDidMount')
        this.fetchData();
        this.intervalId = setInterval(this.fetchData, 5000)
    }

    componentDidUpdate(prevProps, prevState){
        console.log('5.- componentDidUpdate')
/*         console.log({
            prevProps,
            prevState
        })

        console.log({
            props: this.props,
            state: this.state
        }) */
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
        console.log('6.- componentWillUnmount');
    }

    fetchData = async () =>{
        this.setState({loading: true, error: null});

        try{
            const data = await api.badges.list();
            this.setState({loading: false, data, error: null});
        } catch(error){
            this.setState({loading: false, error});
        }
    }

    render(){
        console.log('2.- Render');

        if(this.state.loading && !this.state.data){
            return (
                <React.Fragment>
                    <PageLoading/>
                </React.Fragment>
            )
        }

        if(this.state.error){
            return (
                <React.Fragment>
                    <PageError error={this.state.error}/>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img className="Badges__conf-logo" alt="Logo" src={confLogo}></img>
                        </div>
                    </div>
                    <div className="Badges__container">
                        <div className="Badges__buttons">
                            <Link to="/badges/new" className="btn btn-primary">New badge</Link>
                        </div>

                        <div className="Badges__list">
                            <div className="Badges__container">
                                <BadgesList badges={this.state.data} />
                            </div>
                        </div>
                    </div>
                    
                    {this.state.loading && <MiniLoader/>}
                </div>
            </React.Fragment>
        );
    }
}

export default Badges;