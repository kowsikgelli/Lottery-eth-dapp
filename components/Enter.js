import React from 'react'
import LotteryInstance from '../instance';
import web3 from '../web3'
import {Form,Message,Button,Input} from 'semantic-ui-react';
class Enter extends React.Component{
    state={
        players:[],
        balanceInPool:'',
        enteredAmount:'',
        loading:false,
        errorMessage:''
    }
    async componentDidMount(){
        const players = await LotteryInstance.methods.getPlayers().call();
        const balanceInPool = await LotteryInstance.methods.balanceInPool().call();
        this.setState({players,balanceInPool})
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value});
    }
    onSubmit = async(event)=>{
        event.preventDefault();
        this.setState({loading:true})
        try{
            let accounts = await web3.eth.getAccounts()
            await LotteryInstance.methods.enter()
            .send({from:accounts[0],value:web3.utils.toWei(this.state.enteredAmount,'ether')})
            const players = await LotteryInstance.methods.getPlayers().call();
            const balanceInPool = await LotteryInstance.methods.balanceInPool().call();
            this.setState({players,balanceInPool})
        }catch(err){
            this.setState({errorMessage:err.message})
        }
        this.setState({loading:false})
    }
    onClick = async(event)=>{
        try{
            let accounts = await web3.eth.getAccounts()
            await LotteryInstance.methods.pickWinner()
            .send({from:accounts[0]})
            const players = await LotteryInstance.methods.getPlayers().call();
            const balanceInPool = await LotteryInstance.methods.balanceInPool().call();
            this.setState({players,balanceInPool})
        }catch(err){
            console.log(err)
        }
    }
    render(){
        const {players,balanceInPool} = this.state
        return(
            <div>
                <h4>{players.length} bids are entered</h4>
                <h4>Blance in pool : {web3.utils.fromWei(balanceInPool,'ether')} Eth</h4>
                <hr />
                <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                    <Form.Field>
                        <Input 
                        label={{ basic: true, content: 'ETH' }}
                        labelPosition='right'
                        placeholder='Enter Bid Amount' 
                        value={this.state.enteredAmount}
                        name="enteredAmount"
                        onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} color="green">Enter</Button>
                </Form>
                <hr />
                <br />
                <Message
                    header='Only Manger can pick the winner'
                />
                <Button onClick={this.onClick}  primary>Pick Winner</Button>
                
            </div>
        )
    }
}
export default Enter
