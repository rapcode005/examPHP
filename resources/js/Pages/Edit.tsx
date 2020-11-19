import React, { useState, useEffect, FunctionComponent } from "react";
import axios, { AxiosResponse } from "axios"
import { useForm } from "react-hook-form" 

interface movieAPI {
    title: string,
    review: string,
    genre: string
}

const Edit = () => {

    const params = new URLSearchParams(window.location.search)
    const { register, handleSubmit, errors } = useForm<movieAPI>();

    const [id, setId]: [number, (id: number) => void] = useState(0);
    const [title, setTitle]: [string, (title: string) => void] = useState("");
    const [review, setReview]: [string, (review: string) => void] = useState("");
    const [genre, setGenre]: [string, (genre: string) => void] = useState("");
    
    useEffect(() => {
        axios
            .get("/api/v1/Movies/" + params.get('id'), {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .then(response => {
                setTitle(response.data.title);
                setId(response.data.id);
                setReview(response.data.review);
                setGenre(response.data.genre);
                //set(response.data[0].title);
                //setTitle(response.data[0].title);
                //setLoading(false);
            })
            .catch(ex => {
                const error =
                ex === 404
                  ? "Resource not found"
                  : "An unexpected error has occurred";
                //setError(error);
                //setLoading(false);
            });
    }, []);

    const getTitle = (e: any) => {
        let title = e.target.value; 
        setTitle(title);
    }

    const getReview = (e: any) => {
        let review = e.target.value; 
        setReview(review);
    }

    const getGenre = (e: any) => {
        let genre = e.target.value; 
        setGenre(genre);
    }

    const onEditMovie = (data: movieAPI) => {
        let url = "";
        if (review !== "") {
            url = "/api/v1/Movies/" + id + "?title=" + title + "&review=" + review + "&genre=" + genre;
        }
        else {
            url = "/api/v1/Movies/" + id + "?title=" + title + "&genre=" + genre;
        }
        axios
        .put(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        .then(response => {
            window.location.href = "/";
        })
        .catch(ex => {
            //const error =
            //ex.response.status === 404
            //? "Resource not found"
            //: "An unexpected error has occurred";
            //setLoading(false);
        });  
    };
    
    
    return (
        <div className="container">
                <form onSubmit={handleSubmit(onEditMovie)} method="post">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Title:</strong>
                            <input type="text" name="title" className="form-control" placeholder="Title"
                             onChange={getTitle} value={title} ref={register({required: true})}/>
                             {errors.title && errors.title.type === "required" && (
                                 <div className="alert alert-warning">Your must enter your title.</div>
                             )}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Review:</strong>
                            <input type="text" name="review" className="form-control" placeholder="Review"
                              onChange={getReview} value={review} ref={register({required: true})} />
                              {errors.review && errors.review.type === "required" && (
                                  <div className="alert alert-warning">Your must enter your review.</div>
                              )}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Genre:</strong>
                            <input type="text" name="genre" className="form-control" placeholder="Genre"
                              onChange={getGenre} value={genre} ref={register({required: true})}/>
                              {errors.genre && errors.genre.type === "required" && (
                                  <div className="alert alert-warning">Your must enter your genre.</div>
                              )}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </div>
                </div>
                </form>
        </div>
    );
};

export default Edit;