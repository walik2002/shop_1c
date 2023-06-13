import React from 'react';
import '../css/MainPage.css'; // импортируйте свои стили

const MainPage = () => {
    return (
        <div className="home-container">
            <div className="intro-container">
                <h1>Добро пожаловать в фитнес-центр "АДРЕНАЛИН"</h1>
                <p>Мы предлагаем широкий спектр услуг, чтобы помочь вам достичь своих целей и улучшить свое здоровье.</p>
            </div>

            <div className="services-container">
                <h2>Наши услуги</h2>
                <div className="services-list">
                    <div className="service-item">
                        <img src="https://traveltimes.ru/wp-content/uploads/2021/07/krugs4.jpg" alt="Услуга 1" />
                        <h3>Персональные тренировки</h3>
                        <p>Наши профессиональные тренеры помогут вам разработать индивидуальную программу тренировок, чтобы помочь вам достичь ваших целей.</p>

                    </div>
                    <div className="service-item">
                        <img src="https://img.freepik.com/free-photo/group-of-people-exercising-with-dumbbells-in-the-fitness-club-or-gym_613910-18611.jpg?w=1380&t=st=1678542737~exp=1678543337~hmac=96379d75fe60c5de215a1169bb597b9fc77bf8e49c7c0115c20668b61bd112b0" alt="Услуга 2" />
                        <h3>Групповые занятия</h3>
                        <p>Мы предлагаем широкий спектр групповых занятий, включая йогу, зумбу, танцы и другие.</p>

                    </div>

                </div>
            </div>

            <div className="about-container">
                <h2>О нас</h2>
                <div className="about-content">
                    <div className="about-image">
                        <img src="https://adrenalinsport.ukit.me/uploads/s/k/z/g/kzgcpqf9ickk/img/full_Vli9Db6J.jpg" alt="О нас" />
                    </div>
                    <div className="about-text">
                        <p>Мы являемся одним из лучших фитнес-центров в городе, предоставляющим широкий спектр услуг для всех возрастов и уровней подготовки. Наша команда профессионалов всегда готова помочь вам достичь ваших целей и улучшить ваше здоровье.</p>
                        <p>Мы предлагаем современное оборудование, бассейн, групповые занятия по йоге, пилатесу, аэробике, танцам и другим направлениям, а также персональные тренировки и индивидуальные программы питания. У нас вы найдете все необходимое для поддержания здорового образа жизни и достижения своих целей.</p>
                        <p>Кроме того, мы организуем различные мероприятия и акции, чтобы наши клиенты могли получить дополнительную мотивацию и вдохновение. Присоединяйтесь к нашей дружной и активной команде и начните преображение своего тела и души уже сегодня!</p>
                    </div>
                </div>
            </div>
        </div>);
}

export default MainPage;