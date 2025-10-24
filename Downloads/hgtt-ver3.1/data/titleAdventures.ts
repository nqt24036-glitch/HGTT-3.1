import { AdventureStorylet } from '../types.ts';

export const TITLE_ADVENTURES: AdventureStorylet[] = [
  {
    title: "Cơ Duyên của Dược Vương",
    startStepId: "start",
    steps: [
      {
        id: "start",
        description: "Trong một khe núi hẻo lánh, bạn phát hiện một hang động tỏa ra mùi thuốc nồng đậm. Một lão nhân râu tóc bạc phơ đang ngồi bên một lò luyện đan sắp tàn.",
        choices: [
          { text: "Tiến lên hỏi thăm.", outcome: { type: 'continue', nextStepId: 'talk' } },
          { text: "Lặng lẽ quan sát.", outcome: { type: 'continue', nextStepId: 'observe' } },
          { text: "Rời đi, tránh phiền phức.", outcome: { type: 'end' } },
          { text: "Thử trộm một viên đan dược.", outcome: { type: 'battle', monsterName: 'Linh Thạch Nhân' } }
        ]
      },
      {
        id: "talk",
        description: "Lão nhân thở dài: 'Lò sắp tắt, nhưng ta lại thiếu một vị thuốc dẫn là 'Linh Tâm Thảo'. Ngươi có thể giúp ta không?'",
        choices: [
          { text: "Nhận lời giúp đỡ.", outcome: { type: 'continue', nextStepId: 'find_herb' } },
          { text: "Hỏi về lợi ích.", outcome: { type: 'continue', nextStepId: 'ask_reward' } },
          { text: "Từ chối, viện cớ bận.", outcome: { type: 'end' } },
          { text: "Chê bai đan dược của ông ta.", outcome: { type: 'end' } }
        ]
      },
       {
        id: "observe",
        description: "Bạn thấy lão nhân lấy ra một viên đan dược màu xanh biếc, thở dài rồi cất lại. Dường như ông ấy đang gặp khó khăn.",
        choices: [
          { text: "Bây giờ mới tiến lên hỏi thăm.", outcome: { type: 'continue', nextStepId: 'talk' } },
          { text: "Đợi ông ta rời đi.", outcome: { type: 'end' } },
          { text: "Rời đi.", outcome: { type: 'end' } },
          { text: "Gây tiếng động để dọa ông ta.", outcome: { type: 'end' } }
        ]
      },
      {
        id: "find_herb",
        description: "Bạn tìm thấy 'Linh Tâm Thảo' bên một bờ suối, nhưng nó được canh giữ bởi một con 'Hổ Vằn Lửa Rừng' hung dữ.",
        choices: [
          { text: "Chiến đấu với nó.", outcome: { type: 'battle', monsterName: 'Hổ Vằn Lửa Rừng' } },
          { text: "Dùng mồi nhử để dụ nó đi.", outcome: { type: 'continue', nextStepId: 'success' } },
          { text: "Thử hái trộm.", outcome: { type: 'battle', monsterName: 'Hổ Vằn Lửa Rừng' } },
          { text: "Bỏ cuộc.", outcome: { type: 'end' } }
        ]
      },
      {
        id: "ask_reward",
        description: "Lão nhân cười: 'Nếu thành công, ta sẽ tặng ngươi một viên 'Tẩy Tủy Đan', giúp cải thiện căn cốt.'",
        choices: [
          { text: "Đồng ý ngay lập tức.", outcome: { type: 'continue', nextStepId: 'find_herb' } },
          { text: "Vẫn từ chối.", outcome: { type: 'end' } },
          { text: "Đòi thêm.", outcome: { type: 'end' } },
          { text: "Im lặng.", outcome: { type: 'continue', nextStepId: 'find_herb' } }
        ]
      },
      {
        id: "success",
        description: "Bạn mang 'Linh Tâm Thảo' về. Lão nhân mừng rỡ, hoàn thành lò luyện đan. Ông ta đưa bạn một viên đan dược như đã hứa.",
        choices: [
          { text: "Cảm ơn và nhận lấy.", outcome: { type: 'reward', rewardDescription: "Bạn nhận được Tẩy Tủy Đan và danh hiệu [Thần Nông Trợ Thủ]!", rewardItemId: 'item_006', rewardTitle: 'Thần Nông Trợ Thủ' } },
          { text: "Hỏi xin thêm công thức.", outcome: { type: 'reward', rewardDescription: "Lão nhân mỉm cười và tặng bạn danh hiệu [Thần Nông Trợ Thủ].", rewardTitle: 'Thần Nông Trợ Thủ' } },
          { text: "Nhận lấy.", outcome: { type: 'reward', rewardDescription: "Bạn nhận được Tẩy Tủy Đan và danh hiệu [Thần Nông Trợ Thủ]!", rewardItemId: 'item_006', rewardTitle: 'Thần Nông Trợ Thủ' } },
          { text: "Nhận lấy và rời đi.", outcome: { type: 'reward', rewardDescription: "Bạn nhận được Tẩy Tủy Đan và danh hiệu [Thần Nông Trợ Thủ]!", rewardItemId: 'item_006', rewardTitle: 'Thần Nông Trợ Thủ' } }
        ]
      }
    ]
  },
  {
    title: "Kiếm Mộ Chi Linh",
    startStepId: "start",
    steps: [
      {
        id: "start",
        description: "Bạn đi vào một khu kiếm mộ hoang tàn. Hàng ngàn thanh kiếm gãy cắm trên mặt đất, tỏa ra kiếm khí lạnh lẽo. Ở trung tâm, một bóng ma mờ ảo đang ngồi trên một thanh cự kiếm.",
        choices: [
          { text: "Tiến đến gần bóng ma.", outcome: { type: 'continue', nextStepId: 'approach_ghost' } },
          { text: "Thử rút một thanh kiếm.", outcome: { type: 'continue', nextStepId: 'pull_sword' } },
          { text: "Tưởng niệm các vị tiền bối.", outcome: { type: 'continue', nextStepId: 'pay_respects' } },
          { text: "Rời đi.", outcome: { type: 'end' } }
        ]
      },
      {
        id: "approach_ghost",
        description: "Bóng ma ngẩng đầu, đó là một tàn hồn của một kiếm khách. 'Kẻ hậu bối, ngươi đến đây làm gì?'",
        choices: [
          { text: "Bày tỏ lòng ngưỡng mộ kiếm đạo.", outcome: { type: 'continue', nextStepId: 'show_admiration' } },
          { text: "Hỏi về thân thế của ông ta.", outcome: { type: 'continue', nextStepId: 'ask_identity' } },
          { text: "Khiêu chiến.", outcome: { type: 'battle', monsterName: 'Ma Ảnh Linh Hồn' } },
          { text: "Im lặng.", outcome: { type: 'continue', nextStepId: 'show_admiration' } }
        ]
      },
      {
        id: "pull_sword",
        description: "Bạn cố gắng rút một thanh kiếm, nhưng nó tỏa ra một luồng kiếm khí sắc bén tấn công bạn!",
        choices: [
          { text: "Né tránh.", outcome: { type: 'end' } },
          { text: "Dùng vũ khí đỡ.", outcome: { type: 'end' } },
          { text: "Dùng tay không bắt lấy.", outcome: { type: 'end' } },
          { text: "Hét lên.", outcome: { type: 'end' } }
        ]
      },
      {
        id: "pay_respects",
        description: "Bạn cúi đầu bái lạy, thể hiện sự tôn trọng. Bóng ma dường như hài lòng, ông ta nói: 'Rất tốt. Ta sẽ cho ngươi một cơ hội.'",
        choices: [
          { text: "Lắng nghe.", outcome: { type: 'continue', nextStepId: 'show_admiration' } },
          { text: "Cảm tạ.", outcome: { type: 'continue', nextStepId: 'show_admiration' } },
          { text: "Hỏi cơ hội gì.", outcome: { type: 'continue', nextStepId: 'show_admiration' } },
          { text: "Tiếp tục bái lạy.", outcome: { type: 'continue', nextStepId: 'show_admiration' } }
        ]
      },
      {
        id: "show_admiration",
        description: "'Ta ở đây chờ một người có thể thừa hưởng kiếm ý của ta. Ngươi hãy chứng minh mình xứng đáng bằng cách chịu được 3 chiêu của ta.'",
        choices: [
          { text: "Chấp nhận thử thách.", outcome: { type: 'continue', nextStepId: 'challenge_accepted' } },
          { text: "Từ chối.", outcome: { type: 'end' } },
          { text: "Hỏi lại cho chắc.", outcome: { type: 'continue', nextStepId: 'challenge_accepted' } },
          { text: "Mặc cả.", outcome: { type: 'end' } }
        ]
      },
       {
        id: "ask_identity",
        description: "'Ta chỉ là một linh hồn còn sót lại của một kẻ thất bại.' Ông ta lắc đầu và không muốn nói thêm.",
        choices: [
          { text: "Gặng hỏi.", outcome: { type: 'battle', monsterName: 'Ma Ảnh Linh Hồn' } },
          { text: "An ủi ông ta.", outcome: { type: 'continue', nextStepId: 'show_admiration' } },
          { text: "Chuyển chủ đề.", outcome: { type: 'continue', nextStepId: 'show_admiration' } },
          { text: "Rời đi.", outcome: { type: 'end' } }
        ]
      },
      {
        id: "challenge_accepted",
        description: "Bạn đã chịu được 3 chiêu kiếm ý. Tàn hồn gật đầu: 'Ngươi đã đủ tư cách.' Một luồng sáng bay vào tâm trí bạn.",
        choices: [
          { text: "Lĩnh ngộ.", outcome: { type: 'reward', rewardDescription: "Bạn nhận được một chút kinh nghiệm và danh hiệu [Kiếm Khách Vô Danh]!", rewardExp: 500, rewardTitle: 'Kiếm Khách Vô Danh' } },
          { text: "Cảm tạ tiền bối.", outcome: { type: 'reward', rewardDescription: "Bạn nhận được một chút kinh nghiệm và danh hiệu [Kiếm Khách Vô Danh]!", rewardExp: 500, rewardTitle: 'Kiếm Khách Vô Danh' } },
          { text: "Hấp thụ nó.", outcome: { type: 'reward', rewardDescription: "Bạn nhận được một chút kinh nghiệm và danh hiệu [Kiếm Khách Vô Danh]!", rewardExp: 500, rewardTitle: 'Kiếm Khách Vô Danh' } },
          { text: "Chấp nhận nó.", outcome: { type: 'reward', rewardDescription: "Bạn nhận được một chút kinh nghiệm và danh hiệu [Kiếm Khách Vô Danh]!", rewardExp: 500, rewardTitle: 'Kiếm Khách Vô Danh' } }
        ]
      }
    ]
  },
  // Add 8 more stories here...
  {
    title: "Di Tích Sa Mạc",
    startStepId: "start",
    steps: [
      { id: "start", description: "Giữa sa mạc nóng bỏng, bạn thấy một tòa tháp cổ bị cát vùi lấp một nửa. Gió thổi qua tạo ra những âm thanh kỳ quái.", choices: [ { text: "Tiến vào thám hiểm.", outcome: { type: 'continue', nextStepId: "enter_tower" } }, { text: "Tìm kiếm xung quanh.", outcome: { type: 'continue', nextStepId: "search_outside" } }, { text: "Nghỉ ngơi lấy sức.", outcome: { type: 'end' } }, { text: "Bỏ đi.", outcome: { type: 'end' } } ] },
      { id: "enter_tower", description: "Bên trong tòa tháp tối và mát lạnh. Trên tường có những bức bích họa về một nền văn minh cổ đại thờ phụng mặt trời. Có một con đường dẫn xuống và một cầu thang dẫn lên.", choices: [ { text: "Đi xuống.", outcome: { type: 'continue', nextStepId: "go_down" } }, { text: "Đi lên.", outcome: { type: 'battle', monsterName: "Linh Thạch Nhân" } }, { text: "Nghiên cứu bích họa.", outcome: { type: 'continue', nextStepId: "study_murals" } }, { text: "Rời khỏi tháp.", outcome: { type: 'end' } } ] },
      { id: "search_outside", description: "Bạn tìm thấy một bộ xương của một nhà thám hiểm, bên cạnh là một cuốn nhật ký đã cũ nát.", choices: [ { text: "Đọc nhật ký.", outcome: { type: 'continue', nextStepId: "read_diary" } }, { text: "Lấy những vật có giá trị.", outcome: { type: 'reward', rewardLinhThach: 50, rewardDescription: "Bạn nhận được 50 Linh Thạch." } }, { text: "Chôn cất bộ xương.", outcome: { type: 'continue', nextStepId: "bury_bones" } }, { text: "Phớt lờ.", outcome: { type: 'continue', nextStepId: "enter_tower" } } ] },
      { id: "read_diary", description: "Nhật ký viết về một 'Viên Đá Mặt Trời' được giấu ở tầng hầm của tòa tháp, được canh giữ bởi một linh hồn cổ đại.", choices: [ { text: "Tiến vào tháp và đi xuống.", outcome: { type: 'continue', nextStepId: "go_down" } }, { text: "Tiến vào tháp và đi lên.", outcome: { type: 'battle', monsterName: "Linh Thạch Nhân" } }, { text: "Bỏ đi.", outcome: { type: 'end' } }, { text: "Đốt cuốn nhật ký.", outcome: { type: 'end' } } ] },
      { id: "go_down", description: "Dưới tầng hầm là một căn phòng rộng lớn, ở giữa là một bệ đá đặt một viên ngọc phát ra ánh sáng ấm áp. Một 'Ma Ảnh Linh Hồn' đang lơ lửng bảo vệ nó.", choices: [ { text: "Chiến đấu với linh hồn.", outcome: { type: 'battle', monsterName: "Ma Ảnh Linh Hồn" } }, { text: "Thử giao tiếp.", outcome: { type: 'continue', nextStepId: "talk_spirit" } }, { text: "Lén lấy viên ngọc.", outcome: { type: 'battle', monsterName: "Ma Ảnh Linh Hồn" } }, { text: "Rời đi.", outcome: { type: 'end' } } ] },
      { id: "talk_spirit", description: "Linh hồn không tấn công. Nó chỉ vào viên ngọc rồi chỉ vào trái tim của bạn, dường như muốn bạn hấp thụ nó.", choices: [ { text: "Hấp thụ năng lượng.", outcome: { type: 'reward', rewardExp: 1000, rewardTitle: "Kẻ Kế Thừa Mặt Trời", rewardDescription: "Bạn hấp thụ năng lượng và nhận danh hiệu [Kẻ Kế Thừa Mặt Trời]!" } }, { text: "Cảm ơn và rời đi.", outcome: { type: 'end' } }, { text: "Tấn công nó.", outcome: { type: 'battle', monsterName: "Ma Ảnh Linh Hồn" } }, { text: "Lấy viên ngọc.", outcome: { type: 'reward', rewardItemId: "item_014", rewardDescription: "Bạn nhận được Linh Hồn Thạch." } } ] },
      { id: "study_murals", description: "Bạn phát hiện một mật đạo ẩn sau một bức bích họa. Bên trong là một rương báu nhỏ.", choices: [ { text: "Mở rương.", outcome: { type: 'reward', rewardItemId: "item_epi_02", rewardDescription: "Bạn nhận được Hắc Thạch Hộ Thuẫn!" } }, { text: "Rời đi.", outcome: { type: 'end' } }, { text: "Chạm vào nó.", outcome: { type: 'reward', rewardItemId: "item_epi_02", rewardDescription: "Bạn nhận được Hắc Thạch Hộ Thuẫn!" } }, { text: "Kiểm tra bẫy.", outcome: { type: 'reward', rewardItemId: "item_epi_02", rewardDescription: "Bạn nhận được Hắc Thạch Hộ Thuẫn!" } } ] },
      { id: "bury_bones", description: "Bạn chôn cất bộ xương một cách tử tế. Một luồng sáng yếu ớt từ dưới đất bay lên và nhập vào người bạn.", choices: [ { text: "Cảm tạ.", outcome: { type: 'reward', rewardExp: 200, rewardDescription: "Phúc duyên của bạn tăng lên. Bạn nhận được 200 EXP." } }, { text: "Tiếp tục đi.", outcome: { type: 'reward', rewardExp: 200, rewardDescription: "Phúc duyên của bạn tăng lên. Bạn nhận được 200 EXP." } }, { text: "Chấp nhận.", outcome: { type: 'reward', rewardExp: 200, rewardDescription: "Phúc duyên của bạn tăng lên. Bạn nhận được 200 EXP." } }, { text: "Không có gì.", outcome: { type: 'reward', rewardExp: 200, rewardDescription: "Phúc duyên của bạn tăng lên. Bạn nhận được 200 EXP." } } ] },
    ]
  },
  {
    title: "Thợ Săn Yêu Thú",
    startStepId: "start",
    steps: [
      { id: "start", description: "Bạn gặp một thợ săn bị thương đang cố gắng chống lại một con 'Chó Hoang' hung dữ.", choices: [ { text: "Giúp đỡ thợ săn.", outcome: { type: 'battle', monsterName: "Chó Hoang" } }, { text: "Mặc kệ họ.", outcome: { type: 'end' } }, { text: "Ném đá vào con chó.", outcome: { type: 'battle', monsterName: "Chó Hoang" } }, { text: "Chờ thời cơ.", outcome: { type: 'end' } } ] },
      { id: "after_battle", description: "Thợ săn cảm ơn bạn. 'Cảm ơn tráng sĩ. Ta đang săn một con 'Hắc Lang Vương' nhưng lại bị đám lâu la này làm bị thương.'", choices: [ { text: "Hỏi về Hắc Lang Vương.", outcome: { type: 'continue', nextStepId: "ask_wolf" } }, { text: "Đề nghị giúp đỡ.", outcome: { type: 'continue', nextStepId: "offer_help" } }, { text: "Chê ông ta yếu.", outcome: { type: 'end' } }, { text: "Rời đi.", outcome: { type: 'end' } } ] },
      { id: "ask_wolf", description: "'Nó là một con yêu thú xảo quyệt, đã gây hại cho rất nhiều người. Bộ lông của nó rất có giá trị.'", choices: [ { text: "Đề nghị cùng đi săn.", outcome: { type: 'continue', nextStepId: "team_up" } }, { text: "Hỏi về điểm yếu của nó.", outcome: { type: 'continue', nextStepId: "ask_weakness" } }, { text: "Tự mình đi săn.", outcome: { type: 'continue', nextStepId: "hunt_alone" } }, { text: "Bỏ cuộc.", outcome: { type: 'end' } } ] },
      { id: "offer_help", description: "'Thật sao? Vậy thì tốt quá. Chúng ta hãy cùng nhau hành động.'", choices: [ { text: "Đồng ý.", outcome: { type: 'continue', nextStepId: "team_up" } }, { text: "Từ chối.", outcome: { type: 'end' } }, { text: "Hỏi chia phần thưởng.", outcome: { type: 'continue', nextStepId: "team_up" } }, { text: "Đi thôi.", outcome: { type: 'continue', nextStepId: "team_up" } } ] },
      { id: "team_up", description: "Bạn và thợ săn cùng nhau tìm đến hang của 'Hắc Lang Vương'. Con sói khổng lồ đang ngủ say.", choices: [ { text: "Tấn công bất ngờ.", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } }, { text: "Đặt bẫy.", outcome: { type: 'continue', nextStepId: "set_trap" } }, { text: "Thợ săn tấn công trước.", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } }, { text: "Ném đá đánh thức nó.", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } } ] },
      { id: "hunt_alone", description: "Bạn một mình tìm đến hang của 'Hắc Lang Vương'. Nó cảm nhận được sự hiện diện của bạn và lao ra tấn công!", choices: [ { text: "Chiến đấu!", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } }, { text: "Bỏ chạy.", outcome: { type: 'end' } }, { text: "Nấp đi.", outcome: { type: 'end' } }, { text: "Khiêu khích nó.", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } } ] },
      { id: "set_trap", description: "Cái bẫy đã thành công làm con sói bị thương nhẹ. Nó nổi giận và tấn công bạn!", choices: [ { text: "Chiến đấu!", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } }, { text: "Chạy!", outcome: { type: 'end' } }, { text: "Tiếp tục đặt bẫy.", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } }, { text: "Ném thêm đá.", outcome: { type: 'battle', monsterName: "Hắc Lang Vương" } } ] },
      { id: "victory", description: "Bạn đã đánh bại Hắc Lang Vương. Thợ săn rất cảm kích và chia cho bạn một phần chiến lợi phẩm.", choices: [ { text: "Nhận lấy.", outcome: { type: 'reward', rewardLinhThach: 200, rewardItemId: "item_005", rewardTitle: "Thợ Săn Tập Sự", rewardDescription: "Bạn nhận được 200 Linh Thạch, Da Sói và danh hiệu [Thợ Săn Tập Sự]!" } }, { text: "Từ chối.", outcome: { type: 'reward', rewardTitle: "Thợ Săn Tập Sự", rewardDescription: "Bạn nhận được danh hiệu [Thợ Săn Tập Sự]!" } }, { text: "Nhận phần thưởng.", outcome: { type: 'reward', rewardLinhThach: 200, rewardItemId: "item_005", rewardTitle: "Thợ Săn Tập Sự", rewardDescription: "Bạn nhận được 200 Linh Thạch, Da Sói và danh hiệu [Thợ Săn Tập Sự]!" } }, { text: "Đòi tất cả.", outcome: { type: 'reward', rewardLinhThach: 200, rewardItemId: "item_005", rewardTitle: "Thợ Săn Tập Sự", rewardDescription: "Bạn nhận được 200 Linh Thạch, Da Sói và danh hiệu [Thợ Săn Tập Sự]!" } } ] },
    ]
  },
  {
    title: "Bí Mật Dòng Sông",
    startStepId: "start",
    steps: [
        { id: "start", description: "Bạn thấy một cô gái đang khóc bên bờ sông. Dưới nước, có một vật gì đó đang phát sáng lấp lánh.", choices: [ { text: "Hỏi thăm cô gái.", outcome: { type: "continue", nextStepId: "ask_girl" } }, { text: "Lặn xuống xem vật phát sáng.", outcome: { type: "continue", nextStepId: "dive_down" } }, { text: "Bỏ đi.", outcome: { type: "end" } }, { text: "Ném đá xuống nước.", outcome: { type: "end" } } ] },
        { id: "ask_girl", description: "Cô gái nói rằng cô ấy đã đánh rơi chiếc trâm cài tóc gia truyền xuống sông, không dám xuống lấy vì nghe nói dưới sông có 'Thủy Xà' yêu.", choices: [ { text: "Hứa sẽ lấy lại giúp.", outcome: { type: "continue", nextStepId: "promise_help" } }, { text: "Chê cô ấy nhát gan.", outcome: { type: "end" } }, { text: "An ủi cô ấy.", outcome: { type: "continue", nextStepId: "promise_help" } }, { text: "Hỏi về con thủy xà.", outcome: { type: "continue", nextStepId: "ask_monster" } } ] },
        { id: "dive_down", description: "Bạn lặn xuống và thấy chiếc trâm cài tóc bị kẹt trong một khe đá. Một con 'Thủy Xà' lớn đang cuộn mình ngủ gần đó.", choices: [ { text: "Lén lấy chiếc trâm.", outcome: { type: "continue", nextStepId: "sneak_take" } }, { text: "Tấn công con thủy xà.", outcome: { type: "battle", monsterName: "Thủy Xà" } }, { text: "Quay trở lại.", outcome: { type: "continue", nextStepId: "ask_girl" } }, { text: "Chạm vào con thủy xà.", outcome: { type: "battle", monsterName: "Thủy Xà" } } ] },
        { id: "promise_help", description: "Bạn quyết định giúp cô gái và lặn xuống sông. Con 'Thủy Xà' vẫn đang ngủ.", choices: [ { text: "Lén lấy chiếc trâm.", outcome: { type: "continue", nextStepId: "sneak_take" } }, { text: "Tấn công nó ngay.", outcome: { type: "battle", monsterName: "Thủy Xà" } }, { text: "Dùng đá ném ra xa để dụ nó.", outcome: { type: "continue", nextStepId: "sneak_take" } }, { text: "Hét lên.", outcome: { type: "battle", monsterName: "Thủy Xà" } } ] },
        { id: "ask_monster", description: "Cô gái run sợ: 'Nó rất lớn, có vảy màu xanh biếc và có thể phun nước độc'.", choices: [ { text: "Quyết định giúp.", outcome: { type: "continue", nextStepId: "promise_help" } }, { text: "Sợ hãi và bỏ đi.", outcome: { type: "end" } }, { text: "Chế nhạo nó.", outcome: { type: "continue", nextStepId: "promise_help" } }, { text: "An ủi cô gái.", outcome: { type: "continue", nextStepId: "promise_help" } } ] },
        { id: "sneak_take", description: "Bạn nhẹ nhàng lấy được chiếc trâm mà không đánh thức con thủy xà. Bạn mang nó lên cho cô gái.", choices: [ { text: "Trả lại cho cô gái.", outcome: { type: "continue", nextStepId: "return_pin" } }, { text: "Giữ làm của riêng.", outcome: { type: "reward", rewardItemId: "item_rar_04", rewardDescription: "Bạn giữ lại Trâm Gỗ Linh Tê." } }, { text: "Yêu cầu trả ơn.", outcome: { type: "continue", nextStepId: "return_pin" } }, { text: "Ném nó đi.", outcome: { type: "end" } } ] },
        { id: "return_pin", description: "Cô gái rất vui mừng và cảm ơn bạn rối rít. Để tỏ lòng biết ơn, cô ấy tặng bạn một túi thơm thảo dược.", choices: [ { text: "Nhận lấy.", outcome: { type: "reward", rewardItemId: "item_rar_08", rewardTitle: "Hộ Hoa Sứ Giả", rewardDescription: "Bạn nhận được Túi Thơm An Thần và danh hiệu [Hộ Hoa Sứ Giả]!" } }, { text: "Từ chối.", outcome: { type: "reward", rewardTitle: "Hộ Hoa Sứ Giả", rewardDescription: "Bạn nhận được danh hiệu [Hộ Hoa Sứ Giả]!" } }, { text: "Hỏi tên cô ấy.", outcome: { type: "reward", rewardItemId: "item_rar_08", rewardTitle: "Hộ Hoa Sứ Giả", rewardDescription: "Bạn nhận được Túi Thơm An Thần và danh hiệu [Hộ Hoa Sứ Giả]!" } }, { text: "Chào tạm biệt.", outcome: { type: "reward", rewardItemId: "item_rar_08", rewardTitle: "Hộ Hoa Sứ Giả", rewardDescription: "Bạn nhận được Túi Thơm An Thần và danh hiệu [Hộ Hoa Sứ Giả]!" } } ] },
    ]
  },
  // 5 more...
] as AdventureStorylet[];