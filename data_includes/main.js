//// Script to implement the LexTALE test (Lemhöfer & Broersma, 2012) in Ibex using PennController ////
/// Author of original text-based English LexTale PCIbex script: Mieke Slim
/// Author of image-based PCIbex script for Mandarin characters and pseudo-characters: Lisa Levinson
/// Mandarin materials adatped from:
/// Wen, Y., Qiu, Y., Leong, C.X.R. et al. LexCHI: A quick lexical test for estimating language proficiency in Chinese. 
/// Behav Res 56, 2333–2352 (2024). https://doi.org/10.3758/s13428-023-02151-z 


PennController.ResetPrefix(null);
//// Use this command before publishing:
// PennController.DebugOff() 
PennController.Sequence("LexTale_instructions", "LexTale_trials", "closing")

//// Implement the LexTale test
/// Instructions:

// Subject info
   PennController("LexTale_instructions",
    defaultText
    ,
 newText("LexTale_InstructionText", "您好：這是一個漢字測驗，這個部分的測驗一共有60题。每一題中，你將會看到並且聽到兩個漢字的組合。在這些組合當中，有一些是中文語詞，例如：＂科學＂。您需要對每一個組合做出判斷，如果你認為該組合在中文裡是存在的（即使您不能明確地說出該語詞的意思）或是您知道該語詞的話，請點擊＂是中文語詞＂，如果您認為該語詞在中文裡是不存在的，請點擊＂不是中文語詞＂。這個測驗並沒有計時，請您根據您的第一反應盡速作答，您不用過度的猶豫，並且請您在沒有使用任何中文辭典或是字典的幫忙下獨力完成此刻驗。所有的詞語皆為繁體中文，發音為台灣華語。") 
    ,
    newCanvas("myCanvas", 600, 600)
            .settings.add(0,0, getText("LexTale_InstructionText"))
            .print()
    ,              
    newTextInput("Subject", randomnumber = Math.floor(Math.random()*1000000))             
    ,
    newButton("Start")
        .print()
        .wait()
    ,
    newVar("Subject")
        .settings.global()
        .set( getTextInput("Subject") )
    )
    .log( "Subject" , getVar("Subject") )
   

/// Trials
    PennController.Template(
        PennController.GetTable( "stimuli.csv")
        ,
        trial => PennController("LexTale_trials",
            newImage("stimulus", trial.Stimulus)
                .size(50, 50)
                .center()
                .print()
            ,
//            newText("stimulus", trial.Stimulus)
//               .settings.css("font-size", "60px")
//                .settings.css("font-family", "avenir")
//                .settings.bold()
//                .settings.center()
//                .print()
//              ,
            newText("no", "不是中文語詞")
                .settings.css("font-size", "40px")
                .settings.css("font-family", "avenir")
                .settings.color("red")
                .settings.bold()
            ,
            newText("yes", "是中文語詞")
                .settings.css("font-size", "40px")
                .settings.css("font-family", "avenir")
                .settings.color("green")
                .settings.bold()

            ,
            newCanvas(800, 600)
                .settings.add( 0,     100,      getText("no"))
                .settings.add( 500,     100,    getText("yes"))
                .print()
            ,
            newSelector()
                .settings.add(getText("no") , getText("yes") )
                .settings.log()
                .wait()
        )
    .log( "Stimulus"    , trial.Stimulus    )
    .log( "Type"        , trial.Type        )
    .log( "Block"       , trial.Block       )
    .log( "Subject"         , getVar("Subject")         ) 
    )
 
// Send results to server
//PennController.SendResults();

/// Closing text
    PennController("closing",
        defaultText
            .print()
        ,
        newText("<p>Thank you for participating!</p>")
    )
    
