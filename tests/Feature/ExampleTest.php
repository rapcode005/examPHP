<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Model\Movie;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_add_new_movie()
    {
        $response = $this->json('POST', '/api/v1/Movies', ['title' => 'testing',
                                            'review' => 'ok',
                                            'genre' => 'sd'])
                    ->assertStatus(201);
    }

    public function test_get_list_of_all_movies()
    {
        $response = $this->json('Get', '/api/v1/Movies')
                ->assertStatus(200);
    }

    public function test_update_value_movie()
    {
        $response = $this->json('Put', '/api/v1/Movies/15', ['title' => 'Forest Gump 1'])
                ->assertStatus(200);
    }

    public function test_show_json_by_id()
    {
        $response = $this->json('Put', '/api/v1/Movies/15')
                ->assertJson(
                    ["id" => 15,
                    "title" => "Forest Gump 2",
                    "genre" => "Drama",
                    "review" => "Excellent.",
                    "created_at" => "2020-11-16T03:30:55.000000Z",
                    "updated_at"=>"2020-11-19T07:14:45.000000Z"]
                )
                ->assertStatus(200);
    }

    public function test_delete_movie()
    {
        $response = $this->json('Delete', '/api/v1/Movies/15')
        ->assertStatus(200);    
    }

    public function test_search_movie()
    {
        $response = $this->json('Get', '/api/v1/movies/search', ['w' => 'ave'])
        ->assertStatus(200);    
    }

    public function test_sort_movie()
    {
        $response = $this->json('Get', '/api/v1/movies/sort', ['s' => 1,
                                                        'g' => 0])
        ->assertStatus(200);    
    }
}
