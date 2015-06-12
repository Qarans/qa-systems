<?php

class HomeController extends BaseController
{

    public function index()
    {
        return Redirect::route('posts.index');
        return View::make('front.dashboard.index')->with(array(
            'title'    => 'Dashboard',
            'subtitle' => 'selamat datang di USG Boral',
        ));
    }

    /**
     * Prepare login interface
     */
    public function login()
    {
        return View::make('front.template.user.login')->with(array(
            'title'  => 'Login',
            'noAuth' => true,
        ));
    }

    /**
     * Attempting login post from user
     */
    public function loginPost()
    {
        $rules = array(
            'email'    => 'required',
            'password' => 'required|min:3',
        );
        $validation = Validator::make(Input::all(), $rules);
        if ($validation->fails()) {
            return Redirect::back()->withErrors($validation)->withInput()->with('error', 'Repeat Please');
        } else {
            if (Auth::attempt(array('email' => Input::get('email'), 'password' => Input::get('password')))) {
                return Redirect::route('homepage')->with('success', 'You are now logged in!');
            } else {
                return Redirect::back()->with('error', 'Your email/password was incorrect')->withInput();
            }
        }
    }

}
