import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListaClases from "./components/ListaClases";
import ListaClasesU from "./components/ListaClasesU";


function App() {
  return (
    <Router>
      <>
        <div className='navbar navbar-expand-lg navbar-dark bg-dark container-fluid'>
          <a className="navbar-brand" href="/">Tecnolearning</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto navbar-nav">
              <li className='btn btn-dark btn-sm mx-1 '>
                <a className='nav-link active'>
                  <Link to='/ListaClases' className='nav-link'>Editor De Lista</Link>
                </a>
              </li>
              <li className='btn btn-dark btn-sm mx-1 '>
                <a className='nav-link active'>
                  <Link to='/ListaClasesU' className='nav-link'>Lista De Usuario</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/ListaClases" element={<ListaClases />} />
          <Route path="/ListaClasesU" element={<ListaClasesU />} />
        </Routes>
      </>
    </Router>
  );
}
export default App;