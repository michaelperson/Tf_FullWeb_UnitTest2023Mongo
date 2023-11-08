// Element necessaire pour les tests
const server = require('../server');
const db = require('../database');
const Product = require('../models/product');

// dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

// Permet d'utiliser l'API Should de "Chai" - OBLIGATOIRE
const should = chai.should();

// Permet de lancer des requetes vers le server
chai.use(chaiHttp);

// Code a lancer avant ou après les tests
before(() => {
    console.log('Bloc de code executer avant les tests');
    const newProduct = new Product({
        _id: '6228be5f4c2ad7387f6410a3',
        name: 'piles Acaline',
        price: 100
    });
    newProduct.save(); 
});

after(() => {
    console.log('Bloc de code executer aprés les tests');
    db.disconnect();
});

describe('Route Product', () => {
    it('Get all', (done) => {
        chai.request(server)
            .get('/product')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('Insert', (done) => {
        const newProduct = {
            name: 'demo',
            price: 3.14
        };

        chai.request(server)
            .post('/product')
            .send(newProduct)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.deep.include(newProduct);
                //console.log(res.body);
                done();
            });
    });

    it('Get By Id', (done) => {
        chai.request(server)
            .get('/product/6228be5f4c2ad7387f6410a3')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.deep.include({ name: 'piles Acaline' });
                
                //console.log(res.body);
                done();
            });
    });

    it('Get By Wrong Id', (done) => {
        chai.request(server)
            .get('/product/000000000000000000000000')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('Update Product', (done) => 
    {
        const UpdateProduct = new Product({
            _id: '6228be5f4c2ad7387f6410a3',
            name: 'piles Acaline',
            price: 10
        });

        chai.request(server)
        .put("/product/6228be5f4c2ad7387f6410a3")
        .send(UpdateProduct)
        .end((err,res)=>
        {
            res.should.have.status(204);            
            done();
        })

    });
});