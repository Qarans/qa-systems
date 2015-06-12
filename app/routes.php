<?php

Route::group(array('before' => 'guest'), function () {
    Route::get('/login', array('as' => 'users.login', 'uses' => 'HomeController@login'));
    Route::post('/login', array('as' => 'users.login', 'uses' => 'HomeController@loginPost'));
});
