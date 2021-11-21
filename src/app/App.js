import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            price: '',
            products: [],
            _id: ''
        };
        this.addProduct = this.addProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addProduct(e) {
        if (this.state._id) {
            fetch(`/api/products/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Task Updated' });
                    this.setState({ name: '', price: '', _id: '' });
                })
        } else {
            fetch('/api/products', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Product Saved' });
                    this.setState({ name: '', price: '' });
                    this.fetchProducts();
                })
                .catch(err => console.error(err));
        }

        e.preventDefault();
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ products: data });
                this.console.log(this.state.products);
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    deleteProduct(id) {
        fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({ html: 'Product Deleted' });
                this.fetchProducts();
            });
    }

    updateProduct(id) {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    name: data.name,
                    price: data.price,
                    _id: data._id
                })
            });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="brand-logo center-align"  hred="/">Bakery Product List</h1>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProduct} className="center-align">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} type="text" placeholder="Product Name" value={this.state.name} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="price" onChange={this.handleChange} type="number" min="0.00" step="0.01" placeholder="Product Price ($)" value={this.state.price} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn red darken-4">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table className="striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price $</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.products.map(product => {
                                            return (
                                                <tr key={product._id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>
                                                        <button className="btn red darken-4"
                                                            onClick={() => this.updateProduct(product._id)}>Update</button>
                                                        <button className="btn red darken-4" style={{ margin: '4px' }}
                                                            onClick={() => this.deleteProduct(product._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default App;