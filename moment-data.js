window.MomentOfTruthContent = (function () {
  'use strict';

  const locales = {
    ru: {
      configPatch: {
        content: {
          title: 'Момент истины',
          locale: 'ru'
        },
        progress: {
          playerLabel: 'Игрок',
          finishLabel: 'Финиш'
        },
        perfect: {
          text: 'ИДЕАЛ!'
        },
        achievements: {
          list: [
            { id: 'combo3', check: 'combo3', title: 'Ачивка', text: 'Серия 3 ответа подряд' },
            { id: 'combo5', check: 'combo5', title: 'Ачивка', text: 'Серия 5 ответов подряд' },
            { id: 'perfect3', check: 'perfect3', title: 'Снайпер', text: '3 идеальных попадания подряд' },
            { id: 'survivor', check: 'survivor', title: 'Спасение', text: 'Победа с одной жизнью' },
            { id: 'cool', check: 'cool', title: 'Хладнокровие', text: 'Победа без Стоп-кадра' }
          ]
        },
        messages: {
          correct: ['Точное решение.', 'Ответ принят.', 'Отличный темп.'],
          wrong: ['Мимо цели.', 'Не тот сектор.', 'Попробуй другой ритм.'],
          combo: {
            2: 'Серия x2. Темп набран.',
            3: 'Серия x3. Отличный ритм.',
            5: 'Серия x5. Идеальный заход.'
          },
          perfect: ['Идеальное попадание.', 'Чистый центр.', 'Безупречно.'],
          lastChance: 'Последняя жизнь. Держи темп.'
        }
      },
      ui: {
        hud: {
          question: 'Вопрос',
          combo: 'Серия',
          bestCombo: 'Лучшая серия',
          score: 'Очки',
          perfect: 'Идеал',
          accuracy: 'Точность',
          lives: 'Жизни',
          goal: 'Цель',
          stepsWord: 'шагов'
        },
        progress: {
          title: 'Прогресс игрока',
          meta: 'Дойди до финиша раньше, чем закончатся жизни'
        },
        controls: {
          energy: 'Энергия бонусов',
          stop: 'STOP',
          fifty: '50/50',
          freeze: 'Стоп-кадр',
          freezeActive: 'Стоп-кадр активен',
          timer: 'Стоп-кадр'
        },
        banners: {
          stopPrompt: 'Останови индикатор в секторе правильного ответа.',
          freezeActive: 'Стоп-кадр активен. Следи за таймером бонуса.',
          bonusReady: 'Бонус готов.',
          systemReady: 'Система готова к следующему вопросу.'
        },
        track: {
          runnerAria: 'Маркер игрока'
        },
        intro: {
          eyebrow: 'Интерактивная игра',
          title: 'Момент истины',
          subtitle: 'Выбери верный ответ, остановив индикатор в нужном секторе. Держи ритм, копи серию и дойди до финиша раньше, чем закончится запас жизней.',
          statLives: 'Жизни',
          statGoal: 'Цель',
          statQuestions: 'Вопросы',
          hint: '«Стоп-кадр» временно фиксирует индикатор, «50/50» убирает лишние варианты, а идеальное попадание приносит больше очков.',
          modesAria: 'Модификаторы раунда',
          actionMeta: 'Нажми «Начать игру», чтобы войти в раунд',
          startButton: 'Начать игру'
        },
        modes: {
          speed: 'Темп',
          safe: 'Щит',
          double_step: 'X2 шаг',
          boss: 'Усиление'
        },
        modeDescriptions: {
          speed: 'Повышает ценность правильного ответа в этом раунде.',
          safe: 'Ошибка не отнимает жизнь и даёт шанс сохранить ритм.',
          double_step: 'Успешный ответ продвигает сразу на два шага вперёд.',
          boss: 'Особый раунд с повышенным множителем очков.'
        },
        final: {
          eyebrowWin: 'Финиш достигнут',
          eyebrowLose: 'Раунд завершен',
          titleWin: 'Победа!',
          titleLose: 'Попробуй еще раз',
          subtitleDefault: 'Результат игры',
          subtitleWin: 'Ты дошел до финиша и удержал темп до самого конца.',
          subtitleLose: 'Жизни закончились раньше финиша, но раунд уже выглядит многообещающе.',
          scoreLabel: 'Итоговый счет',
          summaryDefault: 'Ты уверенно прошел раунд и собрал сильный результат.',
          summaryWinTemplate: 'Точность {accuracy}%, лучшая серия x{bestCombo}{perfectPart}.',
          summaryPerfectPartTemplate: ' и {perfectAnswers} идеальных попаданий',
          summaryLoseTemplate: 'До финиша оставалось {stepsLeft} шагов. Следующая попытка может быть еще сильнее.',
          progressLabel: 'Прогресс по треку',
          progressTemplate: '{current} / {total} {stepsWord}',
          statCorrect: 'Верных',
          statWrong: 'Ошибок',
          statAccuracy: 'Точность',
          statBestCombo: 'Лучшая серия',
          statPerfect: 'Идеал',
          restart: 'Играть снова',
          exit: 'На стартовый экран'
        },
        misc: {
          questionLoading: 'Загрузка вопроса…',
          perfectBurst: 'ИДЕАЛ!',
          perfectToastTitle: 'Идеал',
          perfectToastText: '+{score} очков',
          secondsShort: 'с'
        }
      },
      questions: [
        { id: 'question_1', question: 'Какое число является простым?', answers: ['9', '11', '15'], correct_index: 1, speed: 340, mode: 'normal' },
        { id: 'question_2', question: 'Какая планета известна как Красная планета?', answers: ['Венера', 'Марс', 'Сатурн'], correct_index: 1, speed: 360, mode: 'speed' },
        { id: 'question_3', question: 'Сколько будет 6 × 7?', answers: ['42', '36', '48'], correct_index: 0, speed: 300, mode: 'safe' },
        { id: 'question_4', question: 'Какой океан самый большой?', answers: ['Атлантический', 'Индийский', 'Тихий'], correct_index: 2, speed: 320, mode: 'double_step' },
        { id: 'question_5', question: 'Какой газ растения поглощают из воздуха?', answers: ['Кислород', 'Углекислый газ', 'Азот'], correct_index: 1, speed: 390, mode: 'boss' }
      ]
    },
    en: {
      configPatch: {
        content: {
          title: 'Moment of Truth',
          locale: 'en'
        },
        progress: {
          playerLabel: 'Player',
          finishLabel: 'Finish'
        },
        perfect: {
          text: 'PERFECT!'
        },
        achievements: {
          list: [
            { id: 'combo3', check: 'combo3', title: 'Achievement', text: '3 correct answers in a row' },
            { id: 'combo5', check: 'combo5', title: 'Achievement', text: '5 correct answers in a row' },
            { id: 'perfect3', check: 'perfect3', title: 'Sharpshooter', text: '3 perfect hits in a row' },
            { id: 'survivor', check: 'survivor', title: 'Survivor', text: 'Win with one life left' },
            { id: 'cool', check: 'cool', title: 'Cold Blood', text: 'Win without Freeze Frame' }
          ]
        },
        messages: {
          correct: ['Precise answer.', 'Answer locked in.', 'Strong rhythm.'],
          wrong: ['Missed the target.', 'Wrong sector.', 'Try a different pace.'],
          combo: {
            2: 'Combo x2. Pace established.',
            3: 'Combo x3. Great rhythm.',
            5: 'Combo x5. Perfect flow.'
          },
          perfect: ['Perfect hit.', 'Dead center.', 'Flawless.'],
          lastChance: 'Last life. Hold your rhythm.'
        }
      },
      ui: {
        hud: {
          question: 'Question',
          combo: 'Combo',
          bestCombo: 'Best Combo',
          score: 'Score',
          perfect: 'Perfect',
          accuracy: 'Accuracy',
          lives: 'Lives',
          goal: 'Goal',
          stepsWord: 'steps'
        },
        progress: {
          title: 'Player Progress',
          meta: 'Reach the finish before you run out of lives'
        },
        controls: {
          energy: 'Bonus Energy',
          stop: 'STOP',
          fifty: '50/50',
          freeze: 'Freeze Frame',
          freezeActive: 'Freeze Frame Active',
          timer: 'Freeze Frame'
        },
        banners: {
          stopPrompt: 'Stop the indicator inside the correct answer sector.',
          freezeActive: 'Freeze Frame is active. Watch the bonus timer.',
          bonusReady: 'Bonus ready.',
          systemReady: 'System ready for the next question.'
        },
        track: {
          runnerAria: 'Player marker'
        },
        intro: {
          eyebrow: 'Interactive Game',
          title: 'Moment of Truth',
          subtitle: 'Choose the correct answer by stopping the indicator in the right sector. Keep the rhythm, build a combo and reach the finish before your lives run out.',
          statLives: 'Lives',
          statGoal: 'Goal',
          statQuestions: 'Questions',
          hint: '"Freeze Frame" temporarily locks the indicator, "50/50" removes extra options, and a perfect hit awards more points.',
          modesAria: 'Round Modifiers',
          actionMeta: 'Press "Start Game" to enter the round',
          startButton: 'Start Game'
        },
        modes: {
          speed: 'Tempo',
          safe: 'Shield',
          double_step: 'X2 Step',
          boss: 'Boost'
        },
        modeDescriptions: {
          speed: 'Raises the value of a correct answer in this round.',
          safe: 'A mistake does not cost a life and lets you keep the flow.',
          double_step: 'A correct answer moves you forward by two steps.',
          boss: 'A special round with a higher score multiplier.'
        },
        final: {
          eyebrowWin: 'Finish reached',
          eyebrowLose: 'Round complete',
          titleWin: 'Victory!',
          titleLose: 'Try again',
          subtitleDefault: 'Game Result',
          subtitleWin: 'You reached the finish and held the rhythm to the end.',
          subtitleLose: 'Your lives ended before the finish, but the round already shows promise.',
          scoreLabel: 'Final Score',
          summaryDefault: 'You cleared the round with a strong result.',
          summaryWinTemplate: 'Accuracy {accuracy}%, best combo x{bestCombo}{perfectPart}.',
          summaryPerfectPartTemplate: ' and {perfectAnswers} perfect hits',
          summaryLoseTemplate: '{stepsLeft} steps remained to the finish. The next try can be even stronger.',
          progressLabel: 'Track Progress',
          progressTemplate: '{current} / {total} {stepsWord}',
          statCorrect: 'Correct',
          statWrong: 'Wrong',
          statAccuracy: 'Accuracy',
          statBestCombo: 'Best Combo',
          statPerfect: 'Perfect',
          restart: 'Play Again',
          exit: 'Back to Start'
        },
        misc: {
          questionLoading: 'Loading question…',
          perfectBurst: 'PERFECT!',
          perfectToastTitle: 'Perfect',
          perfectToastText: '+{score} points',
          secondsShort: 's'
        }
      },
      questions: [
        { id: 'question_1', question: 'Which number is prime?', answers: ['9', '11', '15'], correct_index: 1, speed: 340, mode: 'normal' },
        { id: 'question_2', question: 'Which planet is known as the Red Planet?', answers: ['Venus', 'Mars', 'Saturn'], correct_index: 1, speed: 360, mode: 'speed' },
        { id: 'question_3', question: 'What is 6 × 7?', answers: ['42', '36', '48'], correct_index: 0, speed: 300, mode: 'safe' },
        { id: 'question_4', question: 'Which ocean is the largest?', answers: ['Atlantic', 'Indian', 'Pacific'], correct_index: 2, speed: 320, mode: 'double_step' },
        { id: 'question_5', question: 'Which gas do plants absorb from the air?', answers: ['Oxygen', 'Carbon Dioxide', 'Nitrogen'], correct_index: 1, speed: 390, mode: 'boss' }
      ]
    },
    de: {
      configPatch: {
        content: {
          title: 'Moment der Wahrheit',
          locale: 'de'
        },
        progress: {
          playerLabel: 'Spieler',
          finishLabel: 'Ziel'
        },
        perfect: {
          text: 'PERFEKT!'
        },
        achievements: {
          list: [
            { id: 'combo3', check: 'combo3', title: 'Erfolg', text: '3 richtige Antworten in Folge' },
            { id: 'combo5', check: 'combo5', title: 'Erfolg', text: '5 richtige Antworten in Folge' },
            { id: 'perfect3', check: 'perfect3', title: 'Scharfschütze', text: '3 perfekte Treffer in Folge' },
            { id: 'survivor', check: 'survivor', title: 'Überlebender', text: 'Sieg mit nur einem Leben' },
            { id: 'cool', check: 'cool', title: 'Kaltblütig', text: 'Sieg ohne Freeze Frame' }
          ]
        },
        messages: {
          correct: ['Präzise Antwort.', 'Antwort bestätigt.', 'Starker Rhythmus.'],
          wrong: ['Ziel verfehlt.', 'Falscher Sektor.', 'Versuche ein anderes Tempo.'],
          combo: {
            2: 'Combo x2. Das Tempo steht.',
            3: 'Combo x3. Sehr guter Rhythmus.',
            5: 'Combo x5. Perfekter Lauf.'
          },
          perfect: ['Perfekter Treffer.', 'Genau in der Mitte.', 'Makellos.'],
          lastChance: 'Letztes Leben. Halte den Rhythmus.'
        }
      },
      ui: {
        hud: {
          question: 'Frage',
          combo: 'Combo',
          bestCombo: 'Beste Serie',
          score: 'Punkte',
          perfect: 'Perfekt',
          accuracy: 'Genauigkeit',
          lives: 'Leben',
          goal: 'Ziel',
          stepsWord: 'Schritte'
        },
        progress: {
          title: 'Spielerfortschritt',
          meta: 'Erreiche das Ziel, bevor dir die Leben ausgehen'
        },
        controls: {
          energy: 'Bonusenergie',
          stop: 'STOP',
          fifty: '50/50',
          freeze: 'Freeze Frame',
          freezeActive: 'Freeze Frame aktiv',
          timer: 'Freeze Frame'
        },
        banners: {
          stopPrompt: 'Stoppe den Indikator im Sektor der richtigen Antwort.',
          freezeActive: 'Freeze Frame ist aktiv. Behalte den Bonus-Timer im Blick.',
          bonusReady: 'Bonus ist bereit.',
          systemReady: 'System bereit für die nächste Frage.'
        },
        track: {
          runnerAria: 'Spielermarke'
        },
        intro: {
          eyebrow: 'Interaktives Spiel',
          title: 'Moment der Wahrheit',
          subtitle: 'Wähle die richtige Antwort, indem du den Indikator im passenden Sektor stoppst. Halte den Rhythmus, baue eine Serie auf und erreiche das Ziel, bevor deine Leben ausgehen.',
          statLives: 'Leben',
          statGoal: 'Ziel',
          statQuestions: 'Fragen',
          hint: '"Freeze Frame" friert den Indikator kurz ein, "50/50" entfernt überflüssige Antworten und ein perfekter Treffer bringt mehr Punkte.',
          modesAria: 'Rundenmodifikatoren',
          actionMeta: 'Drücke "Spiel starten", um die Runde zu beginnen',
          startButton: 'Spiel starten'
        },
        modes: {
          speed: 'Tempo',
          safe: 'Schild',
          double_step: 'X2 Schritt',
          boss: 'Boost'
        },
        modeDescriptions: {
          speed: 'Erhöht den Wert einer richtigen Antwort in dieser Runde.',
          safe: 'Ein Fehler kostet kein Leben und hilft, den Rhythmus zu halten.',
          double_step: 'Eine richtige Antwort bringt dich sofort zwei Schritte weiter.',
          boss: 'Eine Spezialrunde mit höherem Punktmultiplikator.'
        },
        final: {
          eyebrowWin: 'Ziel erreicht',
          eyebrowLose: 'Runde beendet',
          titleWin: 'Sieg!',
          titleLose: 'Versuch es noch einmal',
          subtitleDefault: 'Spielergebnis',
          subtitleWin: 'Du hast das Ziel erreicht und den Rhythmus bis zum Ende gehalten.',
          subtitleLose: 'Deine Leben waren vor dem Ziel aufgebraucht, aber der Lauf sieht schon vielversprechend aus.',
          scoreLabel: 'Endpunktzahl',
          summaryDefault: 'Du hast eine starke Runde gespielt.',
          summaryWinTemplate: 'Genauigkeit {accuracy}%, beste Serie x{bestCombo}{perfectPart}.',
          summaryPerfectPartTemplate: ' und {perfectAnswers} perfekte Treffer',
          summaryLoseTemplate: 'Bis zum Ziel fehlten noch {stepsLeft} Schritte. Der nächste Versuch kann noch stärker werden.',
          progressLabel: 'Fortschritt auf der Strecke',
          progressTemplate: '{current} / {total} {stepsWord}',
          statCorrect: 'Richtig',
          statWrong: 'Falsch',
          statAccuracy: 'Genauigkeit',
          statBestCombo: 'Beste Serie',
          statPerfect: 'Perfekt',
          restart: 'Nochmal spielen',
          exit: 'Zum Startbildschirm'
        },
        misc: {
          questionLoading: 'Frage wird geladen…',
          perfectBurst: 'PERFEKT!',
          perfectToastTitle: 'Perfekt',
          perfectToastText: '+{score} Punkte',
          secondsShort: 's'
        }
      },
      questions: [
        { id: 'question_1', question: 'Welche Zahl ist eine Primzahl?', answers: ['9', '11', '15'], correct_index: 1, speed: 340, mode: 'normal' },
        { id: 'question_2', question: 'Welcher Planet ist als der Rote Planet bekannt?', answers: ['Venus', 'Mars', 'Saturn'], correct_index: 1, speed: 360, mode: 'speed' },
        { id: 'question_3', question: 'Wie viel ist 6 × 7?', answers: ['42', '36', '48'], correct_index: 0, speed: 300, mode: 'safe' },
        { id: 'question_4', question: 'Welcher Ozean ist der größte?', answers: ['Atlantik', 'Indischer Ozean', 'Pazifik'], correct_index: 2, speed: 320, mode: 'double_step' },
        { id: 'question_5', question: 'Welches Gas nehmen Pflanzen aus der Luft auf?', answers: ['Sauerstoff', 'Kohlendioxid', 'Stickstoff'], correct_index: 1, speed: 390, mode: 'boss' }
      ]
    },
    fr: {
      configPatch: {
        content: {
          title: 'Moment de vérité',
          locale: 'fr'
        },
        progress: {
          playerLabel: 'Joueur',
          finishLabel: 'Arrivée'
        },
        perfect: {
          text: 'PARFAIT !'
        },
        achievements: {
          list: [
            { id: 'combo3', check: 'combo3', title: 'Succès', text: '3 bonnes réponses de suite' },
            { id: 'combo5', check: 'combo5', title: 'Succès', text: '5 bonnes réponses de suite' },
            { id: 'perfect3', check: 'perfect3', title: 'Tireur d’élite', text: '3 coups parfaits de suite' },
            { id: 'survivor', check: 'survivor', title: 'Survivant', text: 'Victoire avec une seule vie' },
            { id: 'cool', check: 'cool', title: 'Sang-froid', text: 'Victoire sans Freeze Frame' }
          ]
        },
        messages: {
          correct: ['Réponse précise.', 'Réponse validée.', 'Excellent rythme.'],
          wrong: ['Cible manquée.', 'Mauvais secteur.', 'Essaie un autre rythme.'],
          combo: {
            2: 'Combo x2. Le rythme est lancé.',
            3: 'Combo x3. Très bon rythme.',
            5: 'Combo x5. Série parfaite.'
          },
          perfect: ['Coup parfait.', 'Plein centre.', 'Impeccable.'],
          lastChance: 'Dernière vie. Garde le rythme.'
        }
      },
      ui: {
        hud: {
          question: 'Question',
          combo: 'Combo',
          bestCombo: 'Meilleure série',
          score: 'Score',
          perfect: 'Parfait',
          accuracy: 'Précision',
          lives: 'Vies',
          goal: 'Objectif',
          stepsWord: 'étapes'
        },
        progress: {
          title: 'Progression du joueur',
          meta: 'Atteins l’arrivée avant de perdre toutes tes vies'
        },
        controls: {
          energy: 'Énergie bonus',
          stop: 'STOP',
          fifty: '50/50',
          freeze: 'Freeze Frame',
          freezeActive: 'Freeze Frame actif',
          timer: 'Freeze Frame'
        },
        banners: {
          stopPrompt: 'Arrête l’indicateur dans le secteur de la bonne réponse.',
          freezeActive: 'Freeze Frame est actif. Surveille le minuteur du bonus.',
          bonusReady: 'Bonus prêt.',
          systemReady: 'Système prêt pour la prochaine question.'
        },
        track: {
          runnerAria: 'Marqueur du joueur'
        },
        intro: {
          eyebrow: 'Jeu interactif',
          title: 'Moment de vérité',
          subtitle: 'Choisis la bonne réponse en arrêtant l’indicateur dans le bon secteur. Garde le rythme, construis une série et atteins l’arrivée avant d’épuiser tes vies.',
          statLives: 'Vies',
          statGoal: 'Objectif',
          statQuestions: 'Questions',
          hint: '"Freeze Frame" bloque temporairement l’indicateur, "50/50" retire des réponses inutiles et un coup parfait rapporte plus de points.',
          modesAria: 'Modificateurs du tour',
          actionMeta: 'Appuie sur "Commencer" pour lancer la partie',
          startButton: 'Commencer'
        },
        modes: {
          speed: 'Tempo',
          safe: 'Bouclier',
          double_step: 'X2 pas',
          boss: 'Boost'
        },
        modeDescriptions: {
          speed: 'Augmente la valeur d’une bonne réponse pendant ce tour.',
          safe: 'Une erreur ne retire pas de vie et aide à garder le rythme.',
          double_step: 'Une bonne réponse te fait avancer de deux étapes.',
          boss: 'Un tour spécial avec un multiplicateur de score plus élevé.'
        },
        final: {
          eyebrowWin: 'Arrivée atteinte',
          eyebrowLose: 'Partie terminée',
          titleWin: 'Victoire !',
          titleLose: 'Réessaie',
          subtitleDefault: 'Résultat de la partie',
          subtitleWin: 'Tu as atteint l’arrivée et gardé le rythme jusqu’au bout.',
          subtitleLose: 'Tes vies se sont épuisées avant l’arrivée, mais cette tentative est prometteuse.',
          scoreLabel: 'Score final',
          summaryDefault: 'Tu as réalisé une très belle partie.',
          summaryWinTemplate: 'Précision {accuracy} %, meilleure série x{bestCombo}{perfectPart}.',
          summaryPerfectPartTemplate: ' et {perfectAnswers} coups parfaits',
          summaryLoseTemplate: 'Il restait encore {stepsLeft} étapes avant l’arrivée. La prochaine tentative peut être encore meilleure.',
          progressLabel: 'Progression sur la piste',
          progressTemplate: '{current} / {total} {stepsWord}',
          statCorrect: 'Bonnes',
          statWrong: 'Erreurs',
          statAccuracy: 'Précision',
          statBestCombo: 'Meilleure série',
          statPerfect: 'Parfait',
          restart: 'Rejouer',
          exit: 'Retour à l’accueil'
        },
        misc: {
          questionLoading: 'Chargement de la question…',
          perfectBurst: 'PARFAIT !',
          perfectToastTitle: 'Parfait',
          perfectToastText: '+{score} points',
          secondsShort: 's'
        }
      },
      questions: [
        { id: 'question_1', question: 'Quel nombre est premier ?', answers: ['9', '11', '15'], correct_index: 1, speed: 340, mode: 'normal' },
        { id: 'question_2', question: 'Quelle planète est connue comme la planète rouge ?', answers: ['Vénus', 'Mars', 'Saturne'], correct_index: 1, speed: 360, mode: 'speed' },
        { id: 'question_3', question: 'Combien font 6 × 7 ?', answers: ['42', '36', '48'], correct_index: 0, speed: 300, mode: 'safe' },
        { id: 'question_4', question: 'Quel océan est le plus grand ?', answers: ['Atlantique', 'Indien', 'Pacifique'], correct_index: 2, speed: 320, mode: 'double_step' },
        { id: 'question_5', question: 'Quel gaz les plantes absorbent-elles dans l’air ?', answers: ['Oxygène', 'Dioxyde de carbone', 'Azote'], correct_index: 1, speed: 390, mode: 'boss' }
      ]
    },
    zh: {
      configPatch: {
        content: {
          title: '真相时刻',
          locale: 'zh'
        },
        progress: {
          playerLabel: '玩家',
          finishLabel: '终点'
        },
        perfect: {
          text: '完美！'
        },
        achievements: {
          list: [
            { id: 'combo3', check: 'combo3', title: '成就', text: '连续答对 3 题' },
            { id: 'combo5', check: 'combo5', title: '成就', text: '连续答对 5 题' },
            { id: 'perfect3', check: 'perfect3', title: '神射手', text: '连续 3 次完美命中' },
            { id: 'survivor', check: 'survivor', title: '幸存者', text: '只剩 1 条命时获胜' },
            { id: 'cool', check: 'cool', title: '冷静', text: '未使用 Freeze Frame 也获胜' }
          ]
        },
        messages: {
          correct: ['回答精准。', '答案已锁定。', '节奏很好。'],
          wrong: ['没有命中。', '选错区域了。', '换个节奏再试试。'],
          combo: {
            2: '连击 x2，节奏起来了。',
            3: '连击 x3，状态很棒。',
            5: '连击 x5，完美发挥。'
          },
          perfect: ['完美命中。', '正中中心。', '无可挑剔。'],
          lastChance: '最后一条命，稳住节奏。'
        }
      },
      ui: {
        hud: {
          question: '题目',
          combo: '连击',
          bestCombo: '最佳连击',
          score: '分数',
          perfect: '完美',
          accuracy: '准确率',
          lives: '生命',
          goal: '目标',
          stepsWord: '步'
        },
        progress: {
          title: '玩家进度',
          meta: '在生命耗尽前到达终点'
        },
        controls: {
          energy: '技能能量',
          stop: 'STOP',
          fifty: '50/50',
          freeze: 'Freeze Frame',
          freezeActive: 'Freeze Frame 已激活',
          timer: 'Freeze Frame'
        },
        banners: {
          stopPrompt: '在正确答案所在区域内停下指示器。',
          freezeActive: 'Freeze Frame 已激活，请注意技能计时。',
          bonusReady: '技能已就绪。',
          systemReady: '系统已准备好下一题。'
        },
        track: {
          runnerAria: '玩家标记'
        },
        intro: {
          eyebrow: '互动游戏',
          title: '真相时刻',
          subtitle: '把指示器停在正确区域来选择答案。保持节奏、积累连击，并在生命耗尽前冲到终点。',
          statLives: '生命',
          statGoal: '目标',
          statQuestions: '题目',
          hint: '“Freeze Frame” 可以暂时冻结指示器，“50/50” 会去掉多余选项，而完美命中会获得更多分数。',
          modesAria: '回合修饰',
          actionMeta: '点击“开始游戏”进入本局',
          startButton: '开始游戏'
        },
        modes: {
          speed: '节奏',
          safe: '护盾',
          double_step: '双倍步数',
          boss: '强化'
        },
        modeDescriptions: {
          speed: '本回合正确答案的得分更高。',
          safe: '答错不会失去生命，还能帮助你保持节奏。',
          double_step: '答对后会直接前进两步。',
          boss: '特殊回合，分数倍率更高。'
        },
        final: {
          eyebrowWin: '到达终点',
          eyebrowLose: '本局结束',
          titleWin: '胜利！',
          titleLose: '再试一次',
          subtitleDefault: '游戏结果',
          subtitleWin: '你成功到达终点，并把节奏保持到了最后。',
          subtitleLose: '生命在到达终点前耗尽了，但这次表现已经很有潜力。',
          scoreLabel: '最终得分',
          summaryDefault: '你完成了一局很不错的游戏。',
          summaryWinTemplate: '准确率 {accuracy}%，最佳连击 x{bestCombo}{perfectPart}。',
          summaryPerfectPartTemplate: '，其中有 {perfectAnswers} 次完美命中',
          summaryLoseTemplate: '距离终点还差 {stepsLeft} 步。下一次一定会更强。',
          progressLabel: '赛道进度',
          progressTemplate: '{current} / {total} {stepsWord}',
          statCorrect: '答对',
          statWrong: '答错',
          statAccuracy: '准确率',
          statBestCombo: '最佳连击',
          statPerfect: '完美',
          restart: '再玩一次',
          exit: '返回开始页'
        },
        misc: {
          questionLoading: '正在加载题目…',
          perfectBurst: '完美！',
          perfectToastTitle: '完美',
          perfectToastText: '+{score} 分',
          secondsShort: '秒'
        }
      },
      questions: [
        { id: 'question_1', question: '哪个数字是质数？', answers: ['9', '11', '15'], correct_index: 1, speed: 340, mode: 'normal' },
        { id: 'question_2', question: '哪颗行星被称为红色星球？', answers: ['金星', '火星', '土星'], correct_index: 1, speed: 360, mode: 'speed' },
        { id: 'question_3', question: '6 × 7 等于多少？', answers: ['42', '36', '48'], correct_index: 0, speed: 300, mode: 'safe' },
        { id: 'question_4', question: '哪个海洋最大？', answers: ['大西洋', '印度洋', '太平洋'], correct_index: 2, speed: 320, mode: 'double_step' },
        { id: 'question_5', question: '植物从空气中吸收哪种气体？', answers: ['氧气', '二氧化碳', '氮气'], correct_index: 1, speed: 390, mode: 'boss' }
      ]
    },
    es: {
      configPatch: {
        content: {
          title: 'Momento de la verdad',
          locale: 'es'
        },
        progress: {
          playerLabel: 'Jugador',
          finishLabel: 'Meta'
        },
        perfect: {
          text: '¡PERFECTO!'
        },
        achievements: {
          list: [
            { id: 'combo3', check: 'combo3', title: 'Logro', text: '3 respuestas correctas seguidas' },
            { id: 'combo5', check: 'combo5', title: 'Logro', text: '5 respuestas correctas seguidas' },
            { id: 'perfect3', check: 'perfect3', title: 'Francotirador', text: '3 aciertos perfectos seguidos' },
            { id: 'survivor', check: 'survivor', title: 'Superviviente', text: 'Victoria con una sola vida' },
            { id: 'cool', check: 'cool', title: 'Sangre fría', text: 'Victoria sin usar Freeze Frame' }
          ]
        },
        messages: {
          correct: ['Respuesta precisa.', 'Respuesta confirmada.', 'Muy buen ritmo.'],
          wrong: ['Fallaste el objetivo.', 'Sector incorrecto.', 'Prueba con otro ritmo.'],
          combo: {
            2: 'Combo x2. El ritmo ya empezó.',
            3: 'Combo x3. Excelente ritmo.',
            5: 'Combo x5. Racha perfecta.'
          },
          perfect: ['Acierto perfecto.', 'Justo al centro.', 'Impecable.'],
          lastChance: 'Última vida. Mantén el ritmo.'
        }
      },
      ui: {
        hud: {
          question: 'Pregunta',
          combo: 'Combo',
          bestCombo: 'Mejor racha',
          score: 'Puntos',
          perfect: 'Perfecto',
          accuracy: 'Precisión',
          lives: 'Vidas',
          goal: 'Meta',
          stepsWord: 'pasos'
        },
        progress: {
          title: 'Progreso del jugador',
          meta: 'Llega a la meta antes de quedarte sin vidas'
        },
        controls: {
          energy: 'Energía de bonus',
          stop: 'STOP',
          fifty: '50/50',
          freeze: 'Freeze Frame',
          freezeActive: 'Freeze Frame activo',
          timer: 'Freeze Frame'
        },
        banners: {
          stopPrompt: 'Detén el indicador dentro del sector de la respuesta correcta.',
          freezeActive: 'Freeze Frame está activo. Vigila el temporizador del bonus.',
          bonusReady: 'Bonus listo.',
          systemReady: 'Sistema listo para la siguiente pregunta.'
        },
        track: {
          runnerAria: 'Marcador del jugador'
        },
        intro: {
          eyebrow: 'Juego interactivo',
          title: 'Momento de la verdad',
          subtitle: 'Elige la respuesta correcta deteniendo el indicador en el sector adecuado. Mantén el ritmo, acumula combo y llega a la meta antes de perder todas tus vidas.',
          statLives: 'Vidas',
          statGoal: 'Meta',
          statQuestions: 'Preguntas',
          hint: '"Freeze Frame" bloquea temporalmente el indicador, "50/50" elimina opciones extra y un acierto perfecto da más puntos.',
          modesAria: 'Modificadores de ronda',
          actionMeta: 'Pulsa "Comenzar juego" para entrar en la partida',
          startButton: 'Comenzar juego'
        },
        modes: {
          speed: 'Ritmo',
          safe: 'Escudo',
          double_step: 'X2 paso',
          boss: 'Impulso'
        },
        modeDescriptions: {
          speed: 'Aumenta el valor de una respuesta correcta en esta ronda.',
          safe: 'Un error no quita vida y te ayuda a mantener el ritmo.',
          double_step: 'Una respuesta correcta te hace avanzar dos pasos.',
          boss: 'Ronda especial con multiplicador de puntos más alto.'
        },
        final: {
          eyebrowWin: 'Meta alcanzada',
          eyebrowLose: 'Partida terminada',
          titleWin: '¡Victoria!',
          titleLose: 'Inténtalo de nuevo',
          subtitleDefault: 'Resultado de la partida',
          subtitleWin: 'Llegaste a la meta y mantuviste el ritmo hasta el final.',
          subtitleLose: 'Tus vidas se acabaron antes de la meta, pero la partida ya promete mucho.',
          scoreLabel: 'Puntuación final',
          summaryDefault: 'Has completado una partida con muy buen resultado.',
          summaryWinTemplate: 'Precisión {accuracy}%, mejor racha x{bestCombo}{perfectPart}.',
          summaryPerfectPartTemplate: ' y {perfectAnswers} aciertos perfectos',
          summaryLoseTemplate: 'Faltaban {stepsLeft} pasos para la meta. El próximo intento puede ser aún mejor.',
          progressLabel: 'Progreso en la pista',
          progressTemplate: '{current} / {total} {stepsWord}',
          statCorrect: 'Correctas',
          statWrong: 'Errores',
          statAccuracy: 'Precisión',
          statBestCombo: 'Mejor racha',
          statPerfect: 'Perfecto',
          restart: 'Jugar otra vez',
          exit: 'Volver al inicio'
        },
        misc: {
          questionLoading: 'Cargando pregunta…',
          perfectBurst: '¡PERFECTO!',
          perfectToastTitle: 'Perfecto',
          perfectToastText: '+{score} puntos',
          secondsShort: 's'
        }
      },
      questions: [
        { id: 'question_1', question: '¿Qué número es primo?', answers: ['9', '11', '15'], correct_index: 1, speed: 340, mode: 'normal' },
        { id: 'question_2', question: '¿Qué planeta es conocido como el planeta rojo?', answers: ['Venus', 'Marte', 'Saturno'], correct_index: 1, speed: 360, mode: 'speed' },
        { id: 'question_3', question: '¿Cuánto es 6 × 7?', answers: ['42', '36', '48'], correct_index: 0, speed: 300, mode: 'safe' },
        { id: 'question_4', question: '¿Qué océano es el más grande?', answers: ['Atlántico', 'Índico', 'Pacífico'], correct_index: 2, speed: 320, mode: 'double_step' },
        { id: 'question_5', question: '¿Qué gas absorben las plantas del aire?', answers: ['Oxígeno', 'Dióxido de carbono', 'Nitrógeno'], correct_index: 1, speed: 390, mode: 'boss' }
      ]
    }
  };

  return {
    defaultLocale: 'ru',
    locales: locales,
    demoConfig: {
      gameplay: {
        lives: 3,
        stepsToFinish: 6,
        maxAnswerLength: 40,
        scoreCountDurationMs: 1100
      },
      movement: {
        movementType: 'pingpong',
        minStopDelayMs: 800,
        defaultSpeed: 320,
        indicatorType: 'runner'
      },
      bonuses: {
        freezeDurationMs: 10000,
        energyEnabled: true,
        energyMax: 100,
        freezeCost: 100,
        fiftyCost: 60,
        energyGainCorrect: 30,
        energyGainPerfect: 20,
        energyLossWrong: 20
      },
      perfect: {
        enabled: true,
        thresholdRatio: 0.12
      },
      audio: {
        enabled: true,
        volume: 0.05
      }
    }
  };
})();
