document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".stat-num");

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";

        let count = 0;

        const speed = target / 100;

        function updateCounter(){

            count += speed;

            if(count < target){

                counter.innerHTML =
                    Math.floor(count).toLocaleString() + suffix;

                requestAnimationFrame(updateCounter);

            }else{

                counter.innerHTML =
                    target.toLocaleString() + suffix;

            }

        }

        updateCounter();

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".stat-num");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const counter = entry.target;

                const target = Number(counter.dataset.target);
                const suffix = counter.dataset.suffix || "";

                let count = 0;

                const speed = target / 100;

                function updateCounter(){

                    count += speed;

                    if(count < target){

                        counter.innerHTML =
                        Math.floor(count).toLocaleString() + suffix;

                        requestAnimationFrame(updateCounter);

                    }else{

                        counter.innerHTML =
                        target.toLocaleString() + suffix;

                    }

                }

                updateCounter();

                observer.unobserve(counter);

            }

        });

    },{threshold:0.5});

    counters.forEach(counter=>{
        observer.observe(counter);
    });

});