import React, { useState, useEffect, FunctionComponent } from "react";
import { Pagination } from "./Pagination";
import axios, { AxiosResponse } from "axios"
import { InertiaLink } from '@inertiajs/inertia-react'
import { Inertia } from "@inertiajs/inertia";

interface movieAPI {
    id: number,
    title: string,
    review: string,
    genre: string
}

const Home = () => {
    const defaultProps:movieAPI[] = [];

    const [data, setData]: [movieAPI[], (data: movieAPI[]) => void] = useState(defaultProps);
    const [totalV, setTotal]: [number, (total: number) => void] = useState(0);
    const [totalPerPageV, setTotalPerPage]: [number, (totalPerPage: number) => void] = useState(0);
    const [currPage, setCurrPage]: [number, (currPage: number) => void] = useState(0);
    const [search, setSearch]: [string, (search: string) => void] = useState("");
    //const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    
    ///const [error, setError]: [string, (error: string) => void] = useState("");

    //const onDeleteMovie = (event: React.FormEvent, id: number) => {

    const getSearch = (e: any) => {
        let search = e.target.value; 
        setSearch(search);
    }

    const onSearchMovie = (event: any, val: string) => {
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
            });

        return false;
    }

    const onDeleteMovie = (id: number) => {
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
            })
    }

    const refresh = (page?: number) => {
        let url = "";

        if (page !== null && typeof page !== undefined)
            url = "/api/v1/Movies?page=" + page;
        else
            url = "/api/v1/Movies";

        axios
            .get(url, {
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
            });
    }

    useEffect(() => {
        refresh();
    }, []);
    
    const paginate = (pageNumber: number) => {
        refresh(pageNumber);
    };

    const [curHeadClick, setCurHeadClick]: [number, (curHeadClick: number) => void] = useState(1);

    const onSort = (header: number) => {
        
        let d = 0;
        let url = "";

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
            });
    };

    return (        
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        data.map((datas, i) => {
                            return (<tr key={i}> 
                                <td>{datas.title}</td>
                                <td>{datas.genre}</td>
                                <td>{datas.review}</td>
                                <td>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <a
                                                className="btn btn-outline-success my-2 my-sm-0"
                                                onClick={() => {onDeleteMovie(datas.id)}}
                                                >Delete
                                            </a>
                                        </div>
                                        <div className="col-md-3">
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
        </div>
    );
};

export default Home;