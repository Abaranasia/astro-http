<template>
    <div v-if="isLoading">
        Loading ...
    </div>

    <button v-else-if="likeCount===0" @click="handleLike">
        Like this post
    </button>
    
    <button v-else @click="handleLike">
        Like!
        <span>{{ likeCount }}</span>
        {{ likeClicks }}
    </button>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import confetti from 'canvas-confetti';
    import debounce from 'lodash.debounce';
    import { actions } from 'astro:actions';

    interface Props {
        postId: string;
    }

    const props = defineProps<Props>();

    const likeCount= ref(0);
    const likeClicks= ref(0);
    const isLoading= ref(true);

    watch(likeCount, debounce(async() => {
        console.log('likeCount :>> ', likeCount.value);

        await actions.updateLikes({
            postId: props.postId, 
            increment: likeClicks.value
        }); 

        likeClicks.value = 0;
    }, 500));

    const handleLike = async () => {
        likeCount.value= likeCount.value + 1;
        likeClicks.value++;
        
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2,
            }
        })
    }

    const getCurrentLikes = async() => {
        const { data, error } = await actions.getPostLikes(props.postId);
        if (error) return alert(error);
        
        likeCount.value= data.likes;
        isLoading.value= false;
    }

    getCurrentLikes(); // Executes once when component is loaded

</script>

<style scoped>
button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background-color: #4a3f9a;
}
</style>