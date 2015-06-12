<?php

Route::group(['namespace' => 'Front'], function () {
    Route::get('/', array('as' => 'homepage', 'uses' => 'HomeController@index'));
});

Route::group(['before' => 'guest', 'prefix' => 'admin'], function () {
    Route::get('/login', array('as' => 'admin.login', 'uses' => 'HomeController@login'));
    Route::post('/login', array('as' => 'admin.login', 'uses' => 'HomeController@loginPost'));
});
