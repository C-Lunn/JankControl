<script lang="ts">
    import { onMount } from 'svelte';
    let socket: WebSocket;
    let is_playing: boolean = false;
    let queue_exists: boolean = false;
    let title_div: HTMLDivElement;
    let timer_div: HTMLDivElement;
    let playback_slider_div: HTMLInputElement;
    onMount(async () => {
        socket = new WebSocket('ws://77.68.51.61:42069');
        console.log(socket)
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            //console.log(data);
            if (data.type === "NO_QUEUE") {
                queue_exists = false;
            } else if (data.type === "SONG_UPDATE") {
                queue_exists = true;
                if (title_div) title_div.innerText = "Title: " + data.song.title;
                playback_slider_div.value = ((data.song.present_duration / data.song.duration) * 100).toString();
                timer_div.innerText = data.song.present_duration + "/" + data.song.duration;
                is_playing = data.song.is_playing;
            }
            //console.log(data);
            //document.getElementById('infobox')!.innerHTML = event.data;
        };
    });
</script>

<img src="http://textfiles.com/underconstruction/HeHeartlandLane5025imagesconstruction.gif" width=200px>

<h1> welcum 2 my websitre :) </h1>

<img src="http://textfiles.com/underconstruction/NaNashvilleStage9198construction2.gif">

<div id="infobox">
        <div id="title" bind:this={title_div}>Title</div>
        <div id="slider">
            <input type="range" min="0" max="100" value="0" class="slider" id="slidder" bind:this={playback_slider_div}>
            <div id="timmer" bind:this={timer_div}>0:00/0:00</div>
        </div>
    {#if !queue_exists}
        <p>no queue lol</p>
    {/if}
</div>
<div class="button-row">
    {#if queue_exists}
        {#if is_playing}
            <button on:click={() => socket.send('pause')}>Pause</button>
        {:else}
            <button on:click={() => socket.send('play')}>Play</button>
        {/if}
        <button on:click={() => socket.send('skip')}>Skip</button>
    {/if}
</div>