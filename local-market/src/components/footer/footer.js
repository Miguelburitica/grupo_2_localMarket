// import '../../assets/css/footer.css'
function Footer() {
    return (
        <footer className="main-footer">
        <div className="banner-interaction">
            <div className="FQA">
                <a href="/preguntas-respuestas-frecuentes.html"
                    >Preguntas y respuestas frecuentes</a
                >
            </div>
            <div className="technical-support">
                <i className="fas fa-wrench"></i>
                <a href="/soporte-tecnico.html">Soporte técnico</a>
            </div>
        </div>
        <div className="contact-me">
            <h4><i className="fas fa-phone-alt"></i> CONTACTÉNOS</h4>
            <div>
                <i className="fas fa-map-marker-alt"></i>
                Parque Carlos E. Restrepo <br />
                Medellín-Colombia<br />
                Email: localmarket@correo.com
            </div>
            <div>Localmarket</div>
        </div>
    </footer> 
    )
    }
    
    export default Footer;