<script>
export default{
	name : "BookFollowValue",

	props : {
		name : String,
		value : Object,
		text : String
	},

	methods : {
		setSearchParam(param, bookDescriber) {
			if(bookDescriber.deleted_at){
				this.$store.commit("messages/display", {text : "No longer available", success : false});
				return;
			}
			console.log(bookDescriber);
            this.$store.commit("books/clearSearchParams");
            this.$store.commit("books/setSearchParam", { value: [bookDescriber.id], name: param });
            if (this.$route.path !== "/books") {
                this.$router.push("/books");
            }
        }
	},
}
</script>

<template>
	<a href @click.prevent="setSearchParam(name, value)">{{ text }}</a>
</template>
