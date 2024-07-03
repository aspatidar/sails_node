module.exports = (err) =>{
    const res = this.res;
    const req = this.req;
    // console.log('coming in the serverError handler', err, req, res);
    res.status(500).send('Internal server error');
}