<script>
import loadImage from "@/lib/loadImage";
import pageReady from '@/lib/pageReady';
export default {
    name: "PageAuthor",

    async mounted() {
        await loadImage("/img/main.jpg");
        pageReady();
    },
}
</script>

<template>
    <div class="container-fluid mk-page mk-solo-page">
        <div class="row d-flex w-100 justify-content-center">
            <!--Start of author page-->
            <div class="col-md-6 col-8 p-2 row mk-fix p-4 rounded mk-dark-bg mk-white">
                <!-- Start of author img-->
                <div class="col-12 col-md-2">
                    <div class="w-100">
                        <img src="@/assets/imgs/author.jpg" alt="Author image" class="img-fluid mk-main-img portrait" />
                    </div>
                </div>
                <!--Start of author description-->
                <div class="col-12 col-md-10">
                    <div>
                        <h3 class="mk-yellow">Ilija Krstić 155/21</h3>
                        <p>Sole developer of this and many other websites and applications.</p>
                        <p>Student at the ICT College of Vocational Studies in Belgrade.</p>
                        <p>Professional status: Student</p>
                        <p>More than three years of experience with web technologies</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>
                            <h3 class="mk-yellow">Skills</h3>
                            <p>Frontend development</p>
                            <p>Backend development</p>
                            <p>Database design</p>
                            <p></p>
                        </div>
                        <div class="d-flex flex-column">
                            <a href="https://github.com/techbabette" class="btn btn-author bigButton">View
                                Github</a>
                            <a href="https://rs.linkedin.com/in/ilija-krsti%C4%87-b13428134"
                                class="btn btn-author my-2 bigButton">View Linkedin</a>
                        </div>
                    </div>
                </div>
                <!--End of author page-->
            </div>
        </div>
    </div>
</template>

<style>
.mk-main-img {
    max-width: 100%;
    width: 100%;
    border: 2px solid black;
    border-radius: 2%;
}

.listing-img {
    position: relative;
}
</style>

<style scoped>
.mk-page {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.portrait {
    aspect-ratio: 9/16 !important;
}

.btn-author {
    border: 1px solid black;
}
</style>