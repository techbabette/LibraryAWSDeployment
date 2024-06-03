<script>
export default{
    name : "SmartRouteLink",

    props : {
        link : Object,
        active_class: {
            type : String,
            default : "active"
        }
    },

    computed : {
        linkHasIcon : function(){
            return (Object.hasOwn(this.link, "icon") && this.link.icon);
        },
        linkHasText : function(){
            return Object.hasOwn(this.link, "text"); 
        },
        linkHasUrl : function(){
            let extensions = [".xml", ".pdf", ".txt"];
            let linkHasExtension = extensions.some((ext) => this.link.to.endsWith(ext));
            return this.link.to.startsWith("http") || linkHasExtension
        },
        linkHasRoute : function(){
            return !this.linkHasUrl;
        },
        currentlyActiveRoute : function(){
            return this.$store.getters['navigation/activeRoute'];
        },
        additonalClasses : function(){
            let classObject = {};
            classObject[this.active_class] = this.currentlyActiveRoute === this.link.to;
            return classObject;
        }
    }
}
</script>
<template>
    <router-link :title="link.text" v-if="linkHasRoute" :to="{ 'name' : link.to  }" class="nav-link" :class="additonalClasses">
        <span  v-if="linkHasIcon">
            <span class="iconify" :data-icon="link.icon"></span>
        </span>
        <span v-else-if="linkHasText">
            {{link.text}}
        </span>
    </router-link>
    <a :title="link.text" v-else-if="linkHasUrl" :href="link.to">
        <span  v-if="linkHasIcon">
            <span class="iconify" :data-icon="link.icon"></span>
        </span>
        <span v-else-if="linkHasText">
            {{link.text}}
        </span>
    </a>
</template>