import React, { useState, useEffect, FunctionComponent } from "react";
import { Pagination } from "./Pagination";
import axios, { AxiosResponse } from "axios"
import { InertiaLink } from '@inertiajs/inertia-react'
import { Loader } from "./Loader"
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


interface movieAPI {
    id: number,
    title: string,
    review: string,
    genre: string,
    wiki: string
}


const Home = () => {
    const defaultProps:movieAPI[] = [];

    const [data, setData]: [movieAPI[], (data: movieAPI[]) => void] = useState(defaultProps);
    const [totalV, setTotal]: [number, (total: number) => void] = useState(0);
    const [totalPerPageV, setTotalPerPage]: [number, (totalPerPage: number) => void] = useState(0);
    const [currPage, setCurrPage]: [number, (currPage: number) => void] = useState(0);
    const [search, setSearch]: [string, (search: string) => void] = useState("");
    
    const getSearch = (e: any) => {
        let search = e.target.value; 
        setSearch(search);
    }

    const onSearchMovie = (event : React.KeyboardEvent, val: string) => {
        if (event.key == 'Enter') {
            setLoad(true);
                axios
                .get("/api/v1/movies/search?w=" + val, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                })
                .then(response => {
                    setData(response.data.data);
                    setTotalPerPage(response.data.per_page);
                    setTotal(response.data.total);
                    setCurrPage(response.data.current_page);
                    setLoad(false);
                });
        } 
    }

    const onDeleteMovie = (id: number) => {
        
        setLoad(true);

        axios
            .delete<movieAPI[]>("/api/v1/Movies/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .then(response => {
                setData(data.filter(function(item) {
                    return item.id !== id;
                }));
                setLoad(false);
                setShowModal(false);
            })

        setLoad(false);
        setShowModal(false);
    }

    const refresh = (page?: number) => {
        let url = "";

        if (page !== null && typeof page !== undefined)
            url = "/api/v1/Movies?page=" + page;
        else
            url = "/api/v1/Movies";
        
        setLoad(true);

        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .then(response => {
                let x1 = response.data.data;
                setData(x1);
                setTotalPerPage(response.data.per_page);
                setTotal(response.data.total);
                setCurrPage(response.data.current_page);
                setLoad(false);
            });
    }

    useEffect(() => {
        refresh();
    }, []);
    
    const paginate = (pageNumber: number) => {
        refresh(pageNumber);
    };

    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [curID, setCurID] = useState(0);
    
    const handleClose = () => setShowModal(false);
    const handleShow = (id: number) => {
        setShowModal(true);
        setCurID(id);
    }

    const [curHeadClick, setCurHeadClick]: [number, (curHeadClick: number) => void] = useState(1);

    const [load, setLoad] = useState(false);

    const onSort = (header: number) => {
        
        let d = 0;
        let url = "";
        setLoad(true);
        if (curHeadClick === 1) {
            setCurHeadClick(0);
            d = 0;
        }
        else {
            setCurHeadClick(1);
            d = 1;
        }
        
        if (search == ""){
            url = "/api/v1/movies/sort?s=" + header + "&g=" + d;
        }
        else
            url = "/api/v1/movies/sort?s=" + header + "&g=" + d + "&w=" + search;

        axios.
            get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .then(response => {
                setData(response.data.data);
                setTotalPerPage(response.data.per_page);
                setTotal(response.data.total);
                setCurrPage(response.data.current_page);
                setLoad(false);
            });
    };

    return (  
        <React.Fragment>      
            { load ? 
                <div className="container mt-4"><Loader /></div>:
                <div className="container mt-4">
                        <div className="row">
                            <div className="active-cyan-4 mb-4">
                                    <input className="form-control" type="text" placeholder="Search" aria-label="Search"
                                    onChange={getSearch} value={search}
                                    onKeyUp={(e) => onSearchMovie(e, search)}  />
                            </div>
                            <div className="col-md-4">
                                <a className="btn btn-success" href="/create">Add New Movie</a>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th onClick={() => onSort(0)}>
                                            Title
                                        </th>
                                        <th onClick={() => onSort(1)}>
                                            Genre
                                        </th>
                                        <th onClick={() => onSort(2)}>
                                            Review
                                        </th>
                                        <th>Wikipedia(Search using wikipedia)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                            {
                                data.map((datas, i) => {
                                    return (<tr key={i}> 
                                        <td>{datas.title}</td>
                                        <td>{datas.genre}</td>
                                        <td>{datas.review}</td>
                                        <td>{datas.wiki}</td>
                                        <td>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <a
                                                        className="btn btn-outline-success my-2 my-sm-0"
                                                        onClick={() => { handleShow(datas.id)}}
                                                        >Delete
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <InertiaLink 
                                                        href={"/edit?id=" + datas.id} 
                                                        className="btn btn-outline-success my-2 my-sm-0"
                                                    >Edit</InertiaLink>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>);
                                })
                            }
                        </tbody>
                            </table>
                        </div>
                        <Pagination 
                            totalPerPage={totalPerPageV} 
                            total={totalV}
                            ClickHandler={paginate} />

                        <Modal show={showModal} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Do you really want to delete?</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose} >No</Button>
                                <Button variant="primary" onClick={() => onDeleteMovie(curID)}>Delete</Button>
                            </Modal.Footer>
                        </Modal>                    
                </div>
            }
        </React.Fragment>
    );
};

export default Home;