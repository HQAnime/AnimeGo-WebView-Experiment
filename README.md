# AnimeGo WebView Experiment
I was thinking about how to block ads/popups for my app, [AnimeGo](https://github.com/HenryQuan/AnimeGo). 
After some **duckduckgo**ing, I found out that [react-native-webview](https://github.com/react-native-community/react-native-webview) does support `originWhitelist` 
but it wasn't great because it still opened in my browser. 
Then, I tried `onShouldStartLoadWithRequest` and by getting the `domain` of the video, I could 'block' all ads/popups that not from that `domain`. 
This isn't perfect because there might be a redirect (which means different domain) and you will be blocking the video. 
By checking if the `title` is empty, it solves some problems but I cannot say for sure that this will work in all senarios.

This will be added to the new version of `AnimeGo` and maybe it is also time to update my UI a little bit to support IOS and UWP. 
The website is still great compared to [AnimeOne](https://github.com/HenryQuan/AnimeOne) expect for ads/popups because it shows a cover of the anime. 
In this way, we, users, know which anime it is.

## APK
I built an APK just for fun. If you want to use it, please feel free to do so. 
However, there won't be any updates to this repo anymore as long as it is working. 

[Release Build](https://github.com/HenryQuan/AnimeGo-WebView-Experiment/releases/tag/0.0.1)

Maybe a Windows version will be added but who knows?
