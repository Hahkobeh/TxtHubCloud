package com.txthub.txtbasedadventure.story;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StoryService {

    private final StoryRepository storyRepo;

    @Autowired
    public StoryService(StoryRepository storyRepo){
        this.storyRepo = storyRepo;
    }

    public List<Story> getStories (){
        return storyRepo.findAll();
    }


    public List<Story> getLikedStories(){
        return storyRepo.findAll(Sort.by(Direction.DESC,"Likes"));
    }

    
    
    
    public Story createStory(StoryForm storyForm){
        Story story = new Story(storyForm.getStoryName(),storyForm.getAuthor(),storyForm.getGenre());
        storyRepo.save(story);
        return story;

    }


    public void delStory(String id){
        
        try{
            storyRepo.deleteById(id);
        }catch(IllegalArgumentException e){

        }
        
    }

    
}
