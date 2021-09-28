<?php

namespace App\Http\Controllers;

use App\Stat\StatFacade;

class StatController extends Controller
{
    protected $stat;

    public function __construct(StatFacade $stat)
    {
        $this->stat = $stat;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->stat->getAllCardStats();
    }
}
