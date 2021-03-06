package com.txthub.usersystem.matchmaking;

import java.util.ArrayList;
import java.util.List;

import com.txthub.usersystem.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("challenge/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ChallengeController {

    private final ChallengeService chService;
    private final UserService userService;

    @Autowired public ChallengeController(ChallengeService chService,UserService userService){
        this.chService = chService;
        this.userService = userService;
    }



    @GetMapping("/all/{username}")
    @ResponseBody
    public List<ChallengeView> getAllChallenges(@PathVariable String username){
        List<Challenge> chls = chService.getChallengesForUser(username);
        List<ChallengeView> res = new ArrayList<ChallengeView>();
        for(Challenge ch: chls){
            res.add(new ChallengeView(ch,username));
        }
        return res;
    }

    @GetMapping("/finished/{username}")
    @ResponseBody
    public List<ChallengeView> getAllFinishedChallenges(@PathVariable String username){

        List<Challenge> chls = chService.getChallengesForUserFinished(username);
        List<ChallengeView> res = new ArrayList<ChallengeView>();
        for(Challenge ch: chls){
            res.add(new ChallengeView(ch,username));
        }
        return res;
    }

    @GetMapping("/current/{username}")
    @ResponseBody
    public List<ChallengeView> getAllCurrentChallenges(@PathVariable String username){
        List<Challenge> chls = chService.getChallengesForUserCurrent(username);
        List<ChallengeView> res = new ArrayList<ChallengeView>();
        for(Challenge ch: chls){
            res.add(new ChallengeView(ch,username));
        }
        return res;
    }

    @DeleteMapping("/delete/{challengeId}")
    @ResponseBody
    public boolean removeChallenge(@PathVariable String challengeId){
        
        return chService.deleteChallenge(challengeId);
    }

    // make score update api

    @PostMapping("/update")
    @ResponseBody
    public ChallengeResult updateChallengeScore(@RequestBody ScoreForm sf){
        return chService.updateChallenge(sf.getChallengeId(),sf.getUsername(),sf.getScore());
    }

    





    @PostMapping("/send/{username}")
    @ResponseBody
    public boolean sendChallenge(@RequestBody ChallengeForm chForm,@PathVariable String username){
        Challenge ch = new Challenge(username,chForm.getUsername(),chForm.getGame());
        return chService.addChallenge(ch);
    }

    @PostMapping("/sendRandom/{username}")
    @ResponseBody
    public boolean sendRandomChallenge(@RequestBody String game,@PathVariable String username){
        Challenge ch = new Challenge(username,chService.findChallenger(username),game.substring(0,game.length()-1));
        return chService.addChallenge(ch);
    }
    

    @PostMapping("/make")
    @ResponseBody
    public boolean testAddChallenge(){
        Challenge ch = new Challenge("12345","usernameXD","JesusHChrist",0,0,false,"anagram");
        return chService.addChallenge(ch);
    }


}
