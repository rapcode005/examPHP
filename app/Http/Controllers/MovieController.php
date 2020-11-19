<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Movie::paginate(15);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'title' => 'required',
            'review' => 'required',
            'genre' => 'required'

        ]);
        return Movie::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return Movie::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $movie = Movie::find($id);
        $movie->update($request->all());

        return $movie;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Movie::destroy($id);
    }

    public function search(Request $request)
    {
        $result = Movie::where('title', 'LIKE', "%{$request->w}%")
                ->orWhere('review', 'LIKE', "%{$request->w}%")
                ->orWhere('genre', 'LIKE', "%{$request->w}%")
                ->paginate(15);
        return $result;
    }

    public function sort(Request $request) 
    {
        $data = array("title", "genre", "review");
        $type = array("asc", "desc");

        $s = array_values($data)[(int)$request->s];
        $g = array_values($type)[(int)$request->g];

        if (!isset($_GET['w'])) {
            $result = Movie::orderByRaw('upper('.$s.') '.$g)->paginate(15);
        }
        else {
            $result = Movie::where('title', 'LIKE', "%{$request->w}%")
                ->orWhere('review', 'LIKE', "%{$request->w}%")
                ->orWhere('genre', 'LIKE', "%{$request->w}%")
                ->orderByRaw('upper('.$s.') '.$g)
                ->paginate(15);
        }
        
        return $result;
    }

}
