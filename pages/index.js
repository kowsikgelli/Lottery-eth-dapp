import React,{Component} from 'react';
import Layout from '../components/Layout';
import web3 from '../web3.js';
import Lottery from '../ethereum/build/contracts/Lottery.json';
import Error from './_error.js'
import LotteryInstance from '../instance.js';
import Enter from "../components/Enter"
class App extends Component{
    static async getInitialProps(){
        let errorOccured = false;
        let manager
        try{
            manager = await LotteryInstance.methods.manager().call();
        }catch(err){
              console.log(err);
              errorOccured=true;
        }
        return {manager,errorOccured};
    }
    render(){
        const {manager,errorOccured} = this.props;
        if(errorOccured){
            return <Error />
        }
        return(
            <Layout>
                <h3>Manager : {manager}</h3>
                <Enter />
            </Layout>    
        )
    }
}

export default App;
