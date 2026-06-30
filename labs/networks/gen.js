/* مولّد مختبرات «المختصر المفيد في شبكات الكمبيوتر» — يبني ملفات HTML مستقلة بالكامل
   البنية مطابقة لأجزاء الكتاب العشرة + التدريب العملي. م. عبدالله الأسمري */
const fs=require('fs');

/* ============ بيانات المختبرات (مطابقة لفهرس الكتاب) ============ */
const LABS=[
{file:'part01-overview.html',id:'net_p01',icon:'🌐',part:'الجزء الأول',
 title:'نظرة عامة عن شبكات الكمبيوتر',sub:'تعريف الشبكة وتصنيفها — PAN · LAN · Enterprise · Campus · WAN · MAN',
 tags:['تصنيف الشبكات','PAN/LAN/MAN/WAN','حسب الوظائف'],
 match:[
  {a:'PAN',b:'شبكة المساحة الشخصية بنطاق أمتار قليلة كالبلوتوث'},
  {a:'LAN',b:'شبكة المساحة المحلية داخل مبنى أو طابق'},
  {a:'Enterprise Network',b:'شبكة مؤسسية تربط مواقع المنشأة وخدماتها'},
  {a:'Campus Network',b:'شبكة تربط عدة مبانٍ متجاورة في موقع واحد'},
  {a:'WAN',b:'شبكة واسعة تربط مواقع متباعدة جغرافياً'},
  {a:'MAN',b:'شبكة على مستوى مدينة كاملة'},
 ],
 table:[
  {item:'بلوتوث بين جوال وسماعة',ans:'PAN',opts:['PAN','LAN','WAN']},
  {item:'مختبر حاسب في مبنى واحد',ans:'LAN',opts:['PAN','LAN','MAN']},
  {item:'عدة مبانٍ متجاورة في جامعة',ans:'Campus',opts:['LAN','Campus','WAN']},
  {item:'ربط فروع بين مدن ودول',ans:'WAN',opts:['LAN','MAN','WAN']},
  {item:'تغطية مدينة كاملة',ans:'MAN',opts:['LAN','MAN','PAN']},
  {item:'شبكة منشأة بكل خدماتها',ans:'Enterprise',opts:['PAN','Enterprise','MAN']},
 ],
 scen:[
  {q:'تريد ربط أجهزة قسم في طابق واحد داخل المكتب. ما تصنيف الشبكة؟',ans:'LAN',opts:[{n:'PAN',i:'📱',d:'شخصية'},{n:'LAN',i:'🏠',d:'محلية'},{n:'WAN',i:'🌍',d:'واسعة'},{n:'MAN',i:'🏙️',d:'مدينة'}],explain:'LAN تربط الأجهزة في نطاق محدود كطابق أو مبنى.'},
  {q:'جامعة بها 6 مبانٍ متجاورة تريد ربطها معاً. ما التصنيف الأنسب؟',ans:'Campus',opts:[{n:'LAN',i:'🏠',d:''},{n:'Campus',i:'🏫',d:'مبانٍ متجاورة'},{n:'WAN',i:'🌍',d:''},{n:'PAN',i:'📱',d:''}],explain:'شبكة المباني المتجاورة (Campus) تربط مبانٍ في موقع واحد.'},
  {q:'بنك يربط فروعه في الرياض وجدة والدمام. ما التصنيف؟',ans:'WAN',opts:[{n:'LAN',i:'🏠',d:''},{n:'MAN',i:'🏙️',d:''},{n:'WAN',i:'🌍',d:'بين المدن'},{n:'PAN',i:'📱',d:''}],explain:'الربط بين مدن متباعدة جغرافياً = WAN.'},
  {q:'شبكة تغطي مدينة واحدة بمسافات تصل لعشرات الكيلومترات. ما هي؟',ans:'MAN',opts:[{n:'LAN',i:'🏠',d:''},{n:'MAN',i:'🏙️',d:'مدينة'},{n:'WAN',i:'🌍',d:''},{n:'Campus',i:'🏫',d:''}],explain:'MAN على مستوى المدينة.'},
 ],
 quiz:[
  {q:'PAN تعني شبكة؟',opts:['محلية','شخصية','واسعة','مدينة'],ans:1,exp:'Personal Area Network — شخصية قصيرة المدى.'},
  {q:'أي شبكة تربط مبانٍ متجاورة في موقع واحد؟',opts:['LAN','Campus','WAN','PAN'],ans:1,exp:'Campus Network.'},
  {q:'الربط بين دول وقارات يكون عبر؟',opts:['LAN','MAN','WAN','PAN'],ans:2,exp:'WAN واسعة جغرافياً.'},
  {q:'MAN تغطي؟',opts:['طابق','مدينة','قارة','جهازين'],ans:1,exp:'مستوى المدينة.'},
  {q:'الشبكة المؤسسية Enterprise تشمل؟',opts:['جهازين فقط','مواقع المنشأة وخدماتها','بلوتوث','كابل واحد'],ans:1,exp:'تربط مواقع وخدمات المنشأة.'},
  {q:'أصغر أنواع الشبكات نطاقاً؟',opts:['LAN','PAN','MAN','WAN'],ans:1,exp:'PAN الأصغر.'},
  {q:'تصنيف الشبكات في الكتاب يكون حسب؟',opts:['اللون','الحجم/النطاق والوظائف','الشركة المصنّعة','السعر'],ans:1,exp:'حسب النطاق الجغرافي والوظائف والخدمات.'},
  {q:'الإنترنت أكبر مثال على؟',opts:['LAN','PAN','WAN','Campus'],ans:2,exp:'الإنترنت أضخم WAN.'},
 ]},

{file:'part02-lan-ethernet.html',id:'net_p02',icon:'🧩',part:'الجزء الثاني',
 title:'الشبكات المحلية (الإيثرنت ومكوناتها)',sub:'البنية التحتية للإيثرنت — الكوابل النحاسية — المقابس والأجهزة الفعالة',
 tags:['Ethernet','Twisted Pair · RJ45','Patch Panel · NIC'],
 match:[
  {a:'كرت الشبكة (NIC)',b:'يربط جهاز الكمبيوتر بالشبكة ويحمل عنوان MAC'},
  {a:'كوابل التوصيل (Patch Cord)',b:'كابل قصير يربط الجهاز بالمقبس أو لوحة المنافذ'},
  {a:'لوحة توزيع المنافذ (Patch Panel)',b:'لوحة تجمّع نهايات الكوابل في كبينة الاتصالات'},
  {a:'كبينة الاتصالات',b:'خزانة معدنية تُركّب فيها أجهزة وكوابل الشبكة'},
  {a:'نقطة مخرج الشبكة',b:'المقبس الجداري الذي يتصل به جهاز المستخدم'},
  {a:'Twisted Pair',b:'كابل نحاسي مزدوج مجدول شائع في شبكات الإيثرنت'},
 ],
 table:[
  {item:'موصل كوابل الإيثرنت النحاسية',ans:'RJ-45',opts:['RJ-45','LC','BNC']},
  {item:'يحمل عنوان MAC الفيزيائي',ans:'NIC',opts:['NIC','Patch Panel','الكبينة']},
  {item:'أقصى طول لكابل UTP',ans:'100 متر',opts:['50 متر','100 متر','500 متر']},
  {item:'يجمّع نهايات الكوابل مركزياً',ans:'Patch Panel',opts:['NIC','Patch Panel','Splitter']},
  {item:'كابل قصير للتوصيل النهائي',ans:'Patch Cord',opts:['Patch Cord','Backbone','Fiber']},
  {item:'يوفّر الخدمات للمستخدمين',ans:'الخادم (Server)',opts:['الخادم (Server)','المقبس','الكابل']},
 ],
 scen:[
  {q:'تريد توصيل حاسب المستخدم بالمقبس الجداري. أي كابل تستخدم؟',ans:'Patch Cord',opts:[{n:'Patch Cord',i:'🔌',d:'قصير'},{n:'Fiber',i:'🔦',d:''},{n:'Coaxial',i:'🟠',d:''},{n:'Serial',i:'🧵',d:''}],explain:'كابل التوصيل (Patch Cord) النحاسي القصير يربط الجهاز بالمقبس.'},
  {q:'أين تُجمّع نهايات كوابل الطوابق داخل كبينة الاتصالات؟',ans:'Patch Panel',opts:[{n:'NIC',i:'💳',d:''},{n:'Patch Panel',i:'🗄️',d:'لوحة منافذ'},{n:'Router',i:'🧭',d:''},{n:'Splitter',i:'➗',d:''}],explain:'لوحة توزيع المنافذ (Patch Panel) تنظّم نهايات الكوابل.'},
  {q:'ما الجهاز الذي يحمل عنوان MAC الفيزيائي في الحاسب؟',ans:'NIC',opts:[{n:'NIC',i:'💳',d:'كرت الشبكة'},{n:'Patch Panel',i:'🗄️',d:''},{n:'الكبينة',i:'🚪',d:''},{n:'المقبس',i:'🔲',d:''}],explain:'كرت الشبكة (NIC) يحمل عنوان MAC.'},
  {q:'ما أقصى مسافة موثوقة لكابل UTP في الإيثرنت؟',ans:'100 متر',opts:[{n:'50 متر',i:'📏',d:''},{n:'100 متر',i:'✅',d:''},{n:'300 متر',i:'📏',d:''},{n:'1 كم',i:'📏',d:''}],explain:'المعيار 100 متر للنحاس المجدول.'},
 ],
 quiz:[
  {q:'موصل كوابل الإيثرنت النحاسية؟',opts:['RJ-45','LC','BNC','SC'],ans:0,exp:'RJ-45.'},
  {q:'كرت الشبكة يحمل؟',opts:['عنوان IP فقط','عنوان MAC الفيزيائي','كلمة المرور','VLAN'],ans:1,exp:'MAC محروق في NIC.'},
  {q:'لوحة توزيع المنافذ تُسمى؟',opts:['Patch Panel','NIC','Splitter','Hub'],ans:0,exp:'Patch Panel.'},
  {q:'الكبينة (Cabinet) هي؟',opts:['كابل','خزانة معدنية لأجهزة الشبكة','بروتوكول','منفذ'],ans:1,exp:'خزانة تركيب الأجهزة والكوابل.'},
  {q:'أقصى طول UTP؟',opts:['100م','500م','1كم','50م'],ans:0,exp:'100 متر.'},
  {q:'الكابل النحاسي الشائع في الإيثرنت؟',opts:['Coaxial','Twisted Pair','Fiber','Serial'],ans:1,exp:'Twisted Pair المجدول.'},
  {q:'الجهاز الذي يقدّم الخدمات والموارد؟',opts:['المستخدم','الخادم (Server)','المقبس','الكابل'],ans:1,exp:'الخادم.'},
  {q:'نقطة مخرج الشبكة هي؟',opts:['الراوتر','المقبس الجداري','الكبينة','NIC'],ans:1,exp:'المقبس الذي يتصل به الجهاز.'},
 ]},

{file:'part03-enterprise-fiber.html',id:'net_p03',icon:'🔦',part:'الجزء الثالث',
 title:'الشبكات المؤسسية (الألياف الضوئية)',sub:'كوابل الفايبر — أنواع الأوساط ومصادر الضوء — المنافذ الضوئية — المستويات',
 tags:['Single/Multi Mode','مصادر الضوء','Access/Distribution/Core'],
 match:[
  {a:'Single-Mode Fiber',b:'نواة رفيعة تستخدم الليزر لمسافات طويلة جداً'},
  {a:'Multi-Mode Fiber',b:'نواة أعرض تستخدم LED لمسافات أقصر داخل المباني'},
  {a:'المستوى الطرفي (Access)',b:'يربط أجهزة المستخدمين النهائية بالشبكة'},
  {a:'المستوى التوزيعي (Distribution)',b:'يجمّع اتصالات المستوى الطرفي ويطبّق السياسات'},
  {a:'المستوى المركزي (Core)',b:'العمود الفقري السريع الذي يربط أجهزة التوزيع'},
  {a:'المنفذ الضوئي',b:'فتحة توصيل وحدات الفايبر مثل LC و SC'},
 ],
 table:[
  {item:'مصدر الضوء في Single-Mode',ans:'ليزر',opts:['ليزر','LED','شمعة']},
  {item:'مسافات قصيرة داخل المباني',ans:'Multi-Mode',opts:['Single-Mode','Multi-Mode','نحاس']},
  {item:'العمود الفقري السريع',ans:'Core',opts:['Access','Distribution','Core']},
  {item:'يربط المستخدمين مباشرة',ans:'Access',opts:['Access','Core','WAN']},
  {item:'مناعة تامة ضد التشويش EMI',ans:'Fiber',opts:['UTP','Coaxial','Fiber']},
  {item:'موصل شائع للفايبر',ans:'LC',opts:['RJ45','LC','RJ11']},
 ],
 scen:[
  {q:'تربط مبنيين تفصلهما 3 كم بأعلى سرعة وأقل فقد. ما الوسط؟',ans:'Single-Mode',opts:[{n:'UTP',i:'🟫',d:''},{n:'Single-Mode',i:'🔦',d:'ليزر/مسافات'},{n:'Multi-Mode',i:'💡',d:'قصير'},{n:'Coaxial',i:'🟠',d:''}],explain:'المسافات بالكيلومترات تتطلب فايبر أحادي النمط (SMF) بالليزر.'},
  {q:'في تصميم المؤسسة، أي مستوى يربط أجهزة المستخدمين؟',ans:'Access',opts:[{n:'Access',i:'🔌',d:'طرفي'},{n:'Distribution',i:'🔀',d:'توزيعي'},{n:'Core',i:'⚡',d:'مركزي'},{n:'WAN',i:'🌍',d:''}],explain:'المستوى الطرفي (Access) يربط الأجهزة النهائية.'},
  {q:'أي مستوى يمثّل العمود الفقري عالي السرعة؟',ans:'Core',opts:[{n:'Access',i:'🔌',d:''},{n:'Distribution',i:'🔀',d:''},{n:'Core',i:'⚡',d:'مركزي'},{n:'Edge',i:'🧱',d:''}],explain:'المستوى المركزي (Core) هو العمود الفقري.'},
  {q:'لماذا يُفضّل الفايبر في البنية المؤسسية رغم تكلفته؟',ans:'مناعة وسرعة ومسافات',opts:[{n:'أرخص',i:'💰',d:''},{n:'مناعة وسرعة ومسافات',i:'🚀',d:''},{n:'أخف وزناً فقط',i:'🪶',d:''},{n:'لا سبب',i:'🤷',d:''}],explain:'الفايبر يقاوم التشويش ويوفّر سرعات ومسافات عالية.'},
 ],
 quiz:[
  {q:'Single-Mode يستخدم مصدر ضوء؟',opts:['LED','ليزر','نيون','شمس'],ans:1,exp:'الليزر.'},
  {q:'Multi-Mode مناسب لـ؟',opts:['قارات','داخل المباني/مسافات أقصر','الكهرباء','الراديو'],ans:1,exp:'مسافات أقصر.'},
  {q:'العمود الفقري السريع في المؤسسة؟',opts:['Access','Distribution','Core','Edge'],ans:2,exp:'Core.'},
  {q:'المستوى الذي يربط المستخدمين؟',opts:['Access','Core','WAN','MAN'],ans:0,exp:'Access.'},
  {q:'أي وسط مناعي تماماً ضد EMI؟',opts:['UTP','STP','Fiber','Coax'],ans:2,exp:'الفايبر ينقل ضوءاً.'},
  {q:'موصل خاص بالفايبر؟',opts:['RJ45','LC','RJ11','DB9'],ans:1,exp:'LC/SC/ST.'},
  {q:'المستوى الذي يجمّع الطرفي ويطبّق السياسات؟',opts:['Access','Distribution','Core','PAN'],ans:1,exp:'Distribution.'},
  {q:'فحص شبكات الفايبر مهم لـ؟',opts:['اللون','قياس الفقد والجودة','السعر','الوزن'],ans:1,exp:'قياس فقد الإشارة وجودة الوصلة.'},
 ]},

{file:'part04-campus.html',id:'net_p04',icon:'🏫',part:'الجزء الرابع',
 title:'شبكات المباني المتجاورة (Campus)',sub:'البنية التحتية لشبكة المباني المتجاورة وتركيبها وأمثلة عملية',
 tags:['Campus Backbone','ربط المباني','تصميم متدرّج'],
 match:[
  {a:'Campus Network',b:'شبكة تربط عدة مبانٍ متجاورة في موقع واحد'},
  {a:'Backbone',b:'الوصلة الرئيسية عالية السرعة بين المباني'},
  {a:'الفايبر بين المباني',b:'الوسط المفضّل لربط المباني للمسافات والمناعة'},
  {a:'موزّع المبنى (Building Switch)',b:'يجمّع اتصالات الطوابق داخل المبنى'},
  {a:'غرفة الاتصالات الرئيسية',b:'تحتوي أجهزة الـ Core وربط المباني'},
  {a:'التصميم المتدرّج',b:'تقسيم الشبكة لمستويات Access/Distribution/Core'},
 ],
 table:[
  {item:'الوسط المفضّل بين المباني',ans:'Fiber',opts:['UTP','Fiber','Coaxial']},
  {item:'الوصلة الرئيسية بين المباني',ans:'Backbone',opts:['Patch Cord','Backbone','Loopback']},
  {item:'تربط طوابق المبنى الواحد',ans:'سويتش المبنى',opts:['سويتش المبنى','الراوتر','المودم']},
  {item:'يربط الأجهزة الطرفية',ans:'Access',opts:['Access','Core','WAN']},
  {item:'تصميم الحرم يكون',ans:'متدرّج',opts:['عشوائي','متدرّج','مسطّح']},
  {item:'سبب استخدام الفايبر بين المباني',ans:'المسافة والمناعة',opts:['اللون','المسافة والمناعة','الوزن']},
 ],
 scen:[
  {q:'تربط 4 مبانٍ في حرم جامعي تفصلها مئات الأمتار. ما الوسط الأنسب للربط بينها؟',ans:'Fiber',opts:[{n:'UTP',i:'🟫',d:'100م فقط'},{n:'Fiber',i:'🔦',d:'مسافات'},{n:'Wi-Fi',i:'📶',d:''},{n:'Serial',i:'🧵',d:''}],explain:'المسافات بين المباني تتجاوز حد النحاس، فالفايبر هو الحل.'},
  {q:'ما اسم الوصلة الرئيسية عالية السرعة التي تربط المباني؟',ans:'Backbone',opts:[{n:'Patch Cord',i:'🔌',d:''},{n:'Backbone',i:'🦴',d:'عمود فقري'},{n:'Loopback',i:'🔄',d:''},{n:'Crossover',i:'❎',d:''}],explain:'الـ Backbone هو العمود الفقري بين المباني.'},
  {q:'لتنظيم شبكة الحرم وسهولة توسعتها، يُتبع تصميم؟',ans:'متدرّج',opts:[{n:'مسطّح',i:'➖',d:''},{n:'متدرّج',i:'🪜',d:'Access/Dist/Core'},{n:'عشوائي',i:'🎲',d:''},{n:'حلقي فقط',i:'⭕',d:''}],explain:'التصميم المتدرّج (Hierarchical) أسهل في الإدارة والتوسعة.'},
  {q:'أين توضع أجهزة الـ Core وربط المباني عادةً؟',ans:'غرفة الاتصالات الرئيسية',opts:[{n:'غرفة الاتصالات الرئيسية',i:'🏢',d:''},{n:'مكتب المستخدم',i:'🪑',d:''},{n:'خارج المبنى',i:'🌳',d:''},{n:'في الكابل',i:'🧵',d:''}],explain:'غرفة الاتصالات الرئيسية تضم أجهزة المركز وربط المباني.'},
 ],
 quiz:[
  {q:'شبكة المباني المتجاورة تُسمى؟',opts:['LAN','Campus','WAN','PAN'],ans:1,exp:'Campus Network.'},
  {q:'الوسط المفضّل بين مباني الحرم؟',opts:['UTP','Fiber','Coax','Wi-Fi'],ans:1,exp:'الفايبر للمسافة والمناعة.'},
  {q:'الوصلة الرئيسية بين المباني؟',opts:['Patch Cord','Backbone','Loopback','Trunk'],ans:1,exp:'Backbone.'},
  {q:'تصميم شبكة الحرم يكون؟',opts:['مسطّح','متدرّج','عشوائي','بلا تخطيط'],ans:1,exp:'متدرّج/هرمي.'},
  {q:'سبب تجنّب UTP بين المباني البعيدة؟',opts:['لونه','حد 100 متر','وزنه','سعره'],ans:1,exp:'حد المسافة 100م.'},
  {q:'المستوى الذي يربط الأجهزة الطرفية؟',opts:['Access','Core','WAN','MAN'],ans:0,exp:'Access.'},
  {q:'أين توضع أجهزة المركز Core؟',opts:['مكتب المستخدم','غرفة الاتصالات الرئيسية','خارج المبنى','في المقبس'],ans:1,exp:'الغرفة الرئيسية.'},
  {q:'فائدة التصميم المتدرّج؟',opts:['تعقيد','سهولة الإدارة والتوسعة','بطء','تكلفة فقط'],ans:1,exp:'إدارة وتوسعة أسهل.'},
 ]},

{file:'part05-wan-physical.html',id:'net_p05',icon:'🌍',part:'الجزء الخامس',
 title:'الشبكات الواسعة (المكونات الفيزيائية)',sub:'خط التوصيل المحلي — DCE/DTE — الراوتر — منافذ وكوابل وخطوط WAN',
 tags:['Local Loop','DCE/DTE','Leased · Frame Relay'],
 match:[
  {a:'الراوتر (Router)',b:'جهاز يربط الشبكة المحلية بالشبكة الواسعة ويوجّه الحزم'},
  {a:'جهاز الاتصالات البيانية (DCE)',b:'يوفّر التزامن ويحوّل الإشارة عند طرف المزوّد'},
  {a:'جهاز البيانات الطرفي (DTE)',b:'طرف العميل الذي يرسل/يستقبل البيانات (الراوتر غالباً)'},
  {a:'خط التوصيل المحلي (Local Loop)',b:'الوصلة بين موقع العميل ومكتب المزوّد'},
  {a:'الخط المحجوز (Leased Line)',b:'خط مخصّص دائم بين موقعين'},
  {a:'الفريم ريلي (Frame Relay)',b:'تقنية WAN قائمة على الدوائر الافتراضية'},
 ],
 table:[
  {item:'يوجّه بين الشبكات (طبقة 3)',ans:'Router',opts:['Switch','Router','Hub']},
  {item:'طرف العميل في رابط WAN',ans:'DTE',opts:['DTE','DCE','NIC']},
  {item:'يوفّر التزامن عند المزوّد',ans:'DCE',opts:['DTE','DCE','NIC']},
  {item:'منفذ WAN التقليدي',ans:'Serial',opts:['Serial','Console','USB']},
  {item:'خط مخصّص دائم',ans:'Leased Line',opts:['Leased Line','DSL','Wi-Fi']},
  {item:'الوصلة بين العميل والمزوّد',ans:'Local Loop',opts:['Local Loop','Backbone','Trunk']},
 ],
 scen:[
  {q:'ما الجهاز الذي يربط شبكتك المحلية بمزوّد الإنترنت ويوجّه الحزم للخارج؟',ans:'Router',opts:[{n:'Switch',i:'🔀',d:'طبقة 2'},{n:'Router',i:'🧭',d:'طبقة 3'},{n:'Hub',i:'🔁',d:''},{n:'NIC',i:'💳',d:''}],explain:'الراوتر يربط LAN بـ WAN ويوجّه بين الشبكات.'},
  {q:'في مصطلحات WAN، الراوتر لديك يعمل عادةً كـ؟',ans:'DTE',opts:[{n:'DTE',i:'🖥️',d:'طرف العميل'},{n:'DCE',i:'🏢',d:'المزوّد'},{n:'Hub',i:'🔁',d:''},{n:'AP',i:'📶',d:''}],explain:'جهاز العميل = DTE، وجهاز المزوّد الذي يوفّر التزامن = DCE.'},
  {q:'شركة تريد رابطاً مخصّصاً دائماً موثوقاً بين فرعين. ما الخيار؟',ans:'Leased Line',opts:[{n:'Leased Line',i:'📌',d:'مخصّص'},{n:'DSL',i:'🏠',d:''},{n:'Wi-Fi',i:'📶',d:''},{n:'PAN',i:'📱',d:''}],explain:'الخط المحجوز (Leased Line) رابط دائم مخصّص.'},
  {q:'ما المنفذ التقليدي على الراوتر لربط WAN؟',ans:'Serial',opts:[{n:'Console',i:'🖥️',d:'إداري'},{n:'Serial',i:'🔌',d:'WAN'},{n:'USB',i:'🔋',d:''},{n:'AUX',i:'☎️',d:''}],explain:'منافذ Serial تقليدية لروابط WAN.'},
 ],
 quiz:[
  {q:'الجهاز الذي يربط LAN بـ WAN؟',opts:['Switch','Router','Hub','NIC'],ans:1,exp:'الراوتر.'},
  {q:'DTE تعني؟',opts:['جهاز المزوّد','جهاز البيانات الطرفي (العميل)','كابل','منفذ'],ans:1,exp:'Data Terminal Equipment.'},
  {q:'DCE يوفّر؟',opts:['التوجيه','التزامن وتحويل الإشارة','التشفير','VLAN'],ans:1,exp:'التزامن عند طرف المزوّد.'},
  {q:'منفذ WAN التقليدي؟',opts:['Console','Serial','HDMI','USB'],ans:1,exp:'Serial.'},
  {q:'الخط المحجوز هو؟',opts:['مشترك','مخصّص دائم','لاسلكي','عام'],ans:1,exp:'Leased Line مخصّص.'},
  {q:'Local Loop هو؟',opts:['حلقة داخلية','الوصلة بين العميل والمزوّد','بروتوكول','منفذ'],ans:1,exp:'وصلة العميل بمكتب المزوّد.'},
  {q:'Frame Relay تقنية؟',opts:['LAN حديثة','WAN بدوائر افتراضية','تشفير','لاسلكية'],ans:1,exp:'WAN قديمة بـ VC.'},
  {q:'الراوتر يعمل في الطبقة؟',opts:['1','2','3','7'],ans:2,exp:'الطبقة 3.'},
 ]},

{file:'part06-basics.html',id:'net_p06',icon:'📐',part:'الجزء السادس',
 title:'أساسيات تكنولوجيا الشبكات',sub:'البت والبايت — معدل النقل — الأوساط — طرق الدخول — أنواع الإرسال',
 tags:['Bit/Byte · Bandwidth','Shared/Switched','Unicast/Multicast/Broadcast'],
 match:[
  {a:'Bit',b:'أصغر وحدة بيانات: 0 أو 1'},
  {a:'Byte',b:'مجموعة من 8 بتات'},
  {a:'معدل نقل البيانات',b:'كمية البيانات المنقولة في الثانية (bps)'},
  {a:'Unicast',b:'إرسال إلى جهاز واحد محدّد'},
  {a:'Multicast',b:'إرسال إلى مجموعة أجهزة معيّنة'},
  {a:'Broadcast',b:'إرسال إلى جميع أجهزة الشبكة'},
  {a:'الأوساط التشاركية',b:'وسط واحد تتشاركه الأجهزة فتتنافس عليه'},
 ],
 table:[
  {item:'8 بتات تساوي',ans:'بايت',opts:['بت','بايت','حزمة']},
  {item:'إرسال لجهاز واحد',ans:'Unicast',opts:['Unicast','Multicast','Broadcast']},
  {item:'إرسال لكل الأجهزة',ans:'Broadcast',opts:['Unicast','Multicast','Broadcast']},
  {item:'إرسال لمجموعة محددة',ans:'Multicast',opts:['Unicast','Multicast','Broadcast']},
  {item:'وحدة قياس معدل النقل',ans:'bps',opts:['Hz','bps','dpi']},
  {item:'وسط يتشاركه الجميع بتنافس',ans:'تشاركي',opts:['تشاركي','تبادلي','ضوئي']},
 ],
 scen:[
  {q:'جهاز يرسل رسالة موجّهة لجهاز واحد محدّد فقط. ما نوع الإرسال؟',ans:'Unicast',opts:[{n:'Unicast',i:'1️⃣',d:'واحد'},{n:'Multicast',i:'👥',d:'مجموعة'},{n:'Broadcast',i:'📢',d:'الكل'},{n:'Anycast',i:'🎯',d:''}],explain:'Unicast = من مصدر واحد إلى وجهة واحدة.'},
  {q:'بث فيديو لمجموعة مشتركين محددين فقط. ما النوع؟',ans:'Multicast',opts:[{n:'Unicast',i:'1️⃣',d:''},{n:'Multicast',i:'👥',d:'مجموعة'},{n:'Broadcast',i:'📢',d:''},{n:'Loopback',i:'🔄',d:''}],explain:'Multicast يستهدف مجموعة محددة.'},
  {q:'في الوسط التشاركي عند إرسال جهازين معاً يحدث؟',ans:'تصادم',opts:[{n:'تصادم',i:'💥',d:'Collision'},{n:'تشفير',i:'🔒',d:''},{n:'توجيه',i:'🧭',d:''},{n:'لا شيء',i:'🤷',d:''}],explain:'الأوساط التشاركية تسبب تصادمات تتطلب التحكم بالدخول.'},
  {q:'وحدة قياس معدل نقل البيانات؟',ans:'bps',opts:[{n:'Hz',i:'📻',d:'تردد'},{n:'bps',i:'📶',d:'بت/ثانية'},{n:'dpi',i:'🖨️',d:''},{n:'px',i:'🖥️',d:''}],explain:'bps = bits per second.'},
 ],
 quiz:[
  {q:'أصغر وحدة بيانات؟',opts:['البايت','البت','الحزمة','الإطار'],ans:1,exp:'البت (0/1).'},
  {q:'البايت = كم بت؟',opts:['4','8','16','32'],ans:1,exp:'8 بتات.'},
  {q:'الإرسال لجهاز واحد؟',opts:['Unicast','Multicast','Broadcast','Anycast'],ans:0,exp:'Unicast.'},
  {q:'الإرسال لجميع الأجهزة؟',opts:['Unicast','Multicast','Broadcast','None'],ans:2,exp:'Broadcast.'},
  {q:'الإرسال لمجموعة محددة؟',opts:['Unicast','Multicast','Broadcast','Loopback'],ans:1,exp:'Multicast.'},
  {q:'وحدة معدل النقل؟',opts:['Hz','bps','Watt','dpi'],ans:1,exp:'bps.'},
  {q:'الأوساط التشاركية تسبب؟',opts:['تشفير','تصادمات','توجيه','تسريع'],ans:1,exp:'Collisions.'},
  {q:'مفهوم الاتصال عبر الطبقات يعني؟',opts:['تجاهل الترتيب','كل طبقة لها وظيفة وتتعاون','طبقة واحدة','بلا تنظيم'],ans:1,exp:'تقسيم الوظائف على طبقات متعاونة.'},
 ]},

{file:'part07-osi.html',id:'net_p07',icon:'📚',part:'الجزء السابع',
 title:'النموذج المرجعي OSI',sub:'الطبقات السبع — UDP/TCP — IP/ICMP — نموذج TCP/IP',
 tags:['7 Layers','TCP vs UDP','IP · ICMP'],
 match:[
  {a:'الطبقة 7 — التطبيق',b:'واجهة المستخدم مع الشبكة (HTTP, DNS)'},
  {a:'الطبقة 4 — النقل',b:'التجزئة وضمان التسليم (TCP/UDP)'},
  {a:'الطبقة 3 — الشبكة',b:'العنونة المنطقية والتوجيه (IP)'},
  {a:'الطبقة 2 — ربط البيانات',b:'عناوين MAC والإطارات'},
  {a:'الطبقة 1 — المادية',b:'نقل البتات عبر الوسط'},
  {a:'TCP',b:'نقل موثوق موجّه بالاتصال ويرتّب البيانات'},
  {a:'UDP',b:'نقل سريع بلا اتصال وغير موثوق'},
 ],
 table:[
  {item:'عنوان IP',ans:'الطبقة 3',opts:['الطبقة 1','الطبقة 2','الطبقة 3']},
  {item:'عنوان MAC',ans:'الطبقة 2',opts:['الطبقة 1','الطبقة 2','الطبقة 3']},
  {item:'TCP / UDP',ans:'الطبقة 4',opts:['الطبقة 2','الطبقة 3','الطبقة 4']},
  {item:'HTTP / DNS',ans:'الطبقة 7',opts:['الطبقة 4','الطبقة 6','الطبقة 7']},
  {item:'بروتوكول التراسل والتحكم',ans:'ICMP',opts:['ICMP','TCP','ARP']},
  {item:'عدد طبقات OSI',ans:'7',opts:['4','5','7']},
 ],
 scen:[
  {q:'تطبيق بث مباشر يحتاج سرعة ويتحمّل فقد بعض الحزم. أي بروتوكول؟',ans:'UDP',opts:[{n:'TCP',i:'🛡️',d:'موثوق'},{n:'UDP',i:'⚡',d:'سريع'},{n:'IP',i:'🧭',d:''},{n:'ICMP',i:'📡',d:''}],explain:'UDP سريع وبلا اتصال — مناسب للبث.'},
  {q:'في أي طبقة يحدث التوجيه واتخاذ قرار المسار؟',ans:'الشبكة',opts:[{n:'المادية',i:'🔌',d:'1'},{n:'ربط البيانات',i:'🔗',d:'2'},{n:'الشبكة',i:'🧭',d:'3'},{n:'النقل',i:'🚚',d:'4'}],explain:'الطبقة 3 (الشبكة) للتوجيه وعناوين IP.'},
  {q:'أمر ping يستخدم أي بروتوكول؟',ans:'ICMP',opts:[{n:'TCP',i:'🛡️',d:''},{n:'UDP',i:'⚡',d:''},{n:'ICMP',i:'📡',d:'تشخيص'},{n:'IP',i:'🧭',d:''}],explain:'ping يعتمد على ICMP.'},
  {q:'كم عدد طبقات نموذج OSI؟',ans:'7',opts:[{n:'4',i:'4️⃣',d:'TCP/IP'},{n:'5',i:'5️⃣',d:''},{n:'7',i:'7️⃣',d:'OSI'},{n:'9',i:'9️⃣',d:''}],explain:'OSI = 7 طبقات.'},
 ],
 quiz:[
  {q:'كم طبقة في OSI؟',opts:['4','5','7','9'],ans:2,exp:'سبع طبقات.'},
  {q:'TCP يتميّز بـ؟',opts:['غير موثوق','موثوق ومرتب','بث فقط','بلا تسليم'],ans:1,exp:'موثوق وموجّه بالاتصال.'},
  {q:'UDP يتميّز بـ؟',opts:['موثوق','سريع وغير موثوق','مرتب دائماً','مشفّر'],ans:1,exp:'سريع بلا ضمان.'},
  {q:'عناوين IP في الطبقة؟',opts:['2','3','4','7'],ans:1,exp:'الطبقة 3.'},
  {q:'عناوين MAC في الطبقة؟',opts:['1','2','3','4'],ans:1,exp:'الطبقة 2.'},
  {q:'ping يعتمد على؟',opts:['TCP','UDP','ICMP','ARP'],ans:2,exp:'ICMP.'},
  {q:'HTTP وDNS في الطبقة؟',opts:['4','5','6','7'],ans:3,exp:'الطبقة 7.'},
  {q:'الطبقة المادية تنقل؟',opts:['حزم','إطارات','بتات','مقاطع'],ans:2,exp:'البتات.'},
 ]},

{file:'part08-lan-tech.html',id:'net_p08',icon:'🔀',part:'الجزء الثامن',
 title:'تكنولوجيا الشبكات المحلية',sub:'إطار الإيثرنت — عنوان MAC — Hub/Bridge/Switch — تمثيل الأعداد — عنونة IP',
 tags:['Ethernet Frame · MAC','Hub/Bridge/Switch','IP Addressing'],
 match:[
  {a:'إطار الإيثرنت (Frame)',b:'وحدة البيانات في الطبقة 2 تحوي MAC المصدر والوجهة'},
  {a:'عنوان MAC',b:'معرّف فيزيائي 48 بت محروق في كرت الشبكة'},
  {a:'Hub',b:'يكرّر الإشارة لكل المنافذ — جهاز قديم'},
  {a:'Bridge',b:'يربط مقطعين ويفلتر بعناوين MAC'},
  {a:'Switch',b:'يحوّل الإطارات للمنفذ الصحيح حسب جدول MAC'},
  {a:'النظام الثنائي',b:'تمثيل الأعداد بـ 0 و1 الذي تفهمه الأجهزة'},
 ],
 table:[
  {item:'وحدة بيانات الطبقة 2',ans:'Frame',opts:['Packet','Frame','Bit']},
  {item:'طول عنوان MAC',ans:'48 بت',opts:['32 بت','48 بت','128 بت']},
  {item:'يحوّل حسب جدول MAC',ans:'Switch',opts:['Hub','Switch','Router']},
  {item:'يكرّر لكل المنافذ',ans:'Hub',opts:['Hub','Switch','Bridge']},
  {item:'نظام أساسه 16',ans:'الست عشري',opts:['الثنائي','العشري','الست عشري']},
  {item:'طول عنوان IPv4',ans:'32 بت',opts:['32 بت','48 بت','64 بت']},
 ],
 scen:[
  {q:'استقبل السويتش إطاراً لوجهة MAC مجهولة. ماذا يفعل؟',ans:'Flooding',opts:[{n:'يحذفه',i:'🗑️',d:''},{n:'Flooding',i:'🌊',d:'لكل المنافذ'},{n:'يعيده',i:'↩️',d:''},{n:'يشفّره',i:'🔒',d:''}],explain:'عند جهل الوجهة يُغرق الإطار على كل المنافذ عدا المصدر.'},
  {q:'أي جهاز قديم يكرّر الإشارة لكل المنافذ ويسبب تصادمات؟',ans:'Hub',opts:[{n:'Hub',i:'🔁',d:''},{n:'Switch',i:'🔀',d:''},{n:'Router',i:'🧭',d:''},{n:'Bridge',i:'🌉',d:''}],explain:'الهَب (Hub) يكرّر لكل المنافذ.'},
  {q:'كيف يبني السويتش جدول MAC؟',ans:'بتعلّم MAC المصدر',opts:[{n:'عشوائياً',i:'🎲',d:''},{n:'بتعلّم MAC المصدر',i:'🧠',d:''},{n:'من DNS',i:'🌍',d:''},{n:'من DHCP',i:'🎫',d:''}],explain:'يسجّل MAC المصدر مع المنفذ الوارد منه.'},
  {q:'كم بت في عنوان IPv4؟',ans:'32',opts:[{n:'16',i:'🔢',d:''},{n:'32',i:'✅',d:''},{n:'48',i:'🔢',d:'MAC'},{n:'128',i:'🔢',d:'IPv6'}],explain:'IPv4 = 32 بت.'},
 ],
 quiz:[
  {q:'وحدة بيانات الطبقة 2؟',opts:['Packet','Frame','Segment','Bit'],ans:1,exp:'Frame.'},
  {q:'طول عنوان MAC؟',opts:['32','48','64','128'],ans:1,exp:'48 بت.'},
  {q:'الجهاز الذي يحوّل حسب جدول MAC؟',opts:['Hub','Switch','Router','Modem'],ans:1,exp:'Switch.'},
  {q:'ماذا يفعل السويتش عند جهل الوجهة؟',opts:['يحذف','Flooding','يعيد','يشفّر'],ans:1,exp:'يُغرق على كل المنافذ.'},
  {q:'الهَب (Hub) يعمل في الطبقة؟',opts:['1','2','3','4'],ans:0,exp:'الطبقة المادية.'},
  {q:'النظام الذي تفهمه الأجهزة مباشرة؟',opts:['العشري','الثنائي','الست عشري','الروماني'],ans:1,exp:'الثنائي 0/1.'},
  {q:'طول عنوان IPv4؟',opts:['32 بت','48 بت','64 بت','128 بت'],ans:0,exp:'32 بت.'},
  {q:'أول 3 بايت من MAC تمثّل؟',opts:['رقم الجهاز','OUI المُصنّع','VLAN','المنفذ'],ans:1,exp:'مُعرّف الشركة المصنّعة.'},
 ]},

{file:'part09-wan-tech.html',id:'net_p09',icon:'🛰️',part:'الجزء التاسع',
 title:'تكنولوجيا الشبكات الواسعة',sub:'HDLC — PPP — DSL — Frame Relay وإطاره وإدارته',
 tags:['HDLC · PPP','DSL','Frame Relay'],
 match:[
  {a:'HDLC',b:'بروتوكول طبقة 2 بسيط (افتراضي على روابط سيسكو التسلسلية)'},
  {a:'PPP',b:'بروتوكول نقطة لنقطة يدعم المصادقة وضغط البيانات'},
  {a:'DSL',b:'خطوط الاشتراك الرقمية عبر خط الهاتف النحاسي'},
  {a:'Frame Relay',b:'خدمة WAN قائمة على الدوائر الافتراضية'},
  {a:'DSL Splitter',b:'جهاز يفصل إشارة الصوت عن إشارة البيانات'},
  {a:'PAP / CHAP',b:'طريقتا مصادقة ضمن بروتوكول PPP'},
 ],
 table:[
  {item:'يدعم المصادقة على رابط WAN',ans:'PPP',opts:['PPP','HDLC','Ethernet']},
  {item:'افتراضي على روابط سيسكو التسلسلية',ans:'HDLC',opts:['PPP','HDLC','ARP']},
  {item:'وصول WAN عبر خط الهاتف',ans:'DSL',opts:['DSL','MPLS','Fiber']},
  {item:'يعتمد دوائر افتراضية',ans:'Frame Relay',opts:['Frame Relay','PPP','HDLC']},
  {item:'يفصل الصوت عن البيانات',ans:'Splitter',opts:['Router','Splitter','Switch']},
  {item:'CHAP طريقة',ans:'مصادقة',opts:['تشفير قرص','مصادقة','توجيه']},
 ],
 scen:[
  {q:'تريد رابط WAN تسلسلياً يدعم المصادقة PAP/CHAP وضغط البيانات. أي بروتوكول؟',ans:'PPP',opts:[{n:'PPP',i:'🔐',d:''},{n:'HDLC',i:'➖',d:'بسيط'},{n:'Ethernet',i:'🌐',d:''},{n:'OSPF',i:'📡',d:''}],explain:'PPP يدعم المصادقة والضغط على روابط WAN.'},
  {q:'وصول منزلي للإنترنت عبر خط الهاتف النحاسي. ما التقنية؟',ans:'DSL',opts:[{n:'DSL',i:'🏠',d:'خط هاتف'},{n:'Frame Relay',i:'🔲',d:''},{n:'HDLC',i:'➖',d:''},{n:'Fiber',i:'🔦',d:''}],explain:'DSL يستخدم خط الهاتف النحاسي للوصول للإنترنت.'},
  {q:'تقنية WAN قديمة تنقل البيانات عبر دوائر افتراضية بين المواقع؟',ans:'Frame Relay',opts:[{n:'Frame Relay',i:'🔲',d:'VC'},{n:'PPP',i:'🔐',d:''},{n:'DSL',i:'🏠',d:''},{n:'Wi-Fi',i:'📶',d:''}],explain:'Frame Relay قائمة على الدوائر الافتراضية (Virtual Circuits).'},
  {q:'ما البروتوكول الافتراضي على روابط سيسكو التسلسلية؟',ans:'HDLC',opts:[{n:'PPP',i:'🔐',d:''},{n:'HDLC',i:'➖',d:'افتراضي'},{n:'Ethernet',i:'🌐',d:''},{n:'ARP',i:'🔗',d:''}],explain:'HDLC هو الافتراضي على واجهات سيسكو التسلسلية.'},
 ],
 quiz:[
  {q:'البروتوكول الذي يدعم المصادقة على WAN؟',opts:['PPP','HDLC','ARP','RIP'],ans:0,exp:'PPP.'},
  {q:'الافتراضي على روابط سيسكو التسلسلية؟',opts:['PPP','HDLC','Ethernet','DSL'],ans:1,exp:'HDLC.'},
  {q:'DSL يستخدم؟',opts:['الفايبر','خط الهاتف النحاسي','الراديو','الكهرباء'],ans:1,exp:'خط الهاتف.'},
  {q:'Frame Relay تعتمد؟',opts:['دوائر افتراضية','بلوتوث','MAC فقط','DNS'],ans:0,exp:'Virtual Circuits.'},
  {q:'PAP وCHAP هما؟',opts:['تشفير قرص','مصادقة في PPP','بروتوكولات توجيه','أنواع كوابل'],ans:1,exp:'مصادقة ضمن PPP.'},
  {q:'DSL Splitter يفصل؟',opts:['الكهرباء','الصوت عن البيانات','VLANs','المسارات'],ans:1,exp:'الصوت عن البيانات.'},
  {q:'PPP اختصار لـ؟',opts:['Point-to-Point Protocol','Public Packet Path','Private Port','Packet Ping'],ans:0,exp:'Point-to-Point Protocol.'},
  {q:'تقنيات WAN تعمل أساساً في الطبقتين؟',opts:['1 و2','3 و4','5 و6','6 و7'],ans:0,exp:'المادية وربط البيانات.'},
 ]},

{file:'part10-all-together.html',id:'net_p10',icon:'🧠',part:'الجزء العاشر',
 title:'الصورة الكاملة (تكامل + توجيه + أمن + إدارة)',sub:'Subnetting — VLANs — Routing (RIP/OSPF/EIGRP) — إدارة وأمن الشبكات',
 tags:['Subnetting · VLAN','RIP/OSPF/EIGRP','Security · Management'],
 calc:true,
 match:[
  {a:'Subnetting',b:'تقسيم عنوان IP إلى شبكات فرعية أصغر'},
  {a:'VLAN',b:'تقسيم منطقي للسويتش إلى شبكات منفصلة'},
  {a:'Routing',b:'توجيه الحزم بين الشبكات المختلفة'},
  {a:'RIP',b:'بروتوكول توجيه يعتمد عدد القفزات (حد 15)'},
  {a:'OSPF',b:'بروتوكول حالة الرابط يحسب أقصر مسار'},
  {a:'EIGRP',b:'بروتوكول توجيه مطوّر من شركة سيسكو'},
  {a:'إدارة الشبكات',b:'الأعطال والإعدادات والأداء والمحاسبة والحماية'},
 ],
 table:[
  {item:'يعتمد عدد القفزات',ans:'RIP',opts:['RIP','OSPF','EIGRP']},
  {item:'حالة الرابط وأقصر مسار',ans:'OSPF',opts:['RIP','OSPF','EIGRP']},
  {item:'بروتوكول من سيسكو',ans:'EIGRP',opts:['RIP','OSPF','EIGRP']},
  {item:'يفصل الأقسام منطقياً',ans:'VLAN',opts:['VLAN','NAT','Hub']},
  {item:'المضيفون في /26',ans:'62',opts:['30','62','126']},
  {item:'الإرسال للوجهات المجهولة',ans:'Default Route',opts:['Static','Default Route','Host']},
 ],
 scen:[
  {q:'الشبكة 192.168.1.0/26 — كم مضيفاً صالحاً في كل شبكة فرعية؟',ans:'62',opts:[{n:'30',i:'🔢',d:'/27'},{n:'62',i:'✅',d:'/26'},{n:'126',i:'🔢',d:'/25'},{n:'254',i:'🔢',d:'/24'}],explain:'/26 يترك 6 بتات: 2^6−2 = 62.'},
  {q:'تريد فصل قسم المبيعات عن المحاسبة منطقياً على نفس السويتش. الحل؟',ans:'VLAN',opts:[{n:'VLAN',i:'🏷️',d:''},{n:'Hub',i:'🔁',d:''},{n:'NAT',i:'🔄',d:''},{n:'DSL',i:'🏠',d:''}],explain:'VLANs تفصل الأقسام منطقياً وتقلّل نطاق البث.'},
  {q:'شبكة كبيرة تحتاج تقارباً سريعاً وأقصر مسار. أي بروتوكول؟',ans:'OSPF',opts:[{n:'RIP',i:'🐢',d:'بطيء'},{n:'OSPF',i:'⚡',d:'حالة رابط'},{n:'Static',i:'📌',d:''},{n:'ARP',i:'🔗',d:''}],explain:'OSPF بروتوكول حالة رابط سريع التقارب.'},
  {q:'أي مجال من إدارة الشبكات يهتم بمراقبة الأعطال وإصلاحها؟',ans:'إدارة الأعطال',opts:[{n:'إدارة الأعطال',i:'🛠️',d:''},{n:'إدارة المحاسبة',i:'💵',d:''},{n:'إدارة الأداء',i:'📈',d:''},{n:'إدارة الإعدادات',i:'⚙️',d:''}],explain:'إدارة الأعطال (Fault Management) تكتشف وتعالج المشاكل.'},
 ],
 quiz:[
  {q:'Subnetting تعني؟',opts:['تشفير','تقسيم IP لشبكات فرعية','توجيه','تبديل'],ans:1,exp:'تقسيم العنوان.'},
  {q:'VLAN تفيد في؟',opts:['زيادة التصادم','الفصل المنطقي وتقليل البث','إبطاء الشبكة','حذف العناوين'],ans:1,exp:'فصل منطقي.'},
  {q:'RIP يعتمد مقياس؟',opts:['عرض النطاق','عدد القفزات','الكلفة','التأخير'],ans:1,exp:'Hop count.'},
  {q:'OSPF نوعه؟',opts:['Distance-Vector','Link-State','Static','Hybrid'],ans:1,exp:'حالة رابط.'},
  {q:'EIGRP من تطوير؟',opts:['Microsoft','Cisco','Google','IBM'],ans:1,exp:'سيسكو.'},
  {q:'المضيفون في /24؟',opts:['254','256','128','62'],ans:0,exp:'2^8−2=254.'},
  {q:'المسار لكل الوجهات المجهولة؟',opts:['Host','Default Route','Connected','RIP'],ans:1,exp:'0.0.0.0/0.'},
  {q:'من مجالات إدارة الشبكات؟',opts:['إدارة الأعطال والأداء والإعدادات','تصميم الشعار','المحاسبة المالية فقط','لا شيء'],ans:0,exp:'Fault/Config/Performance/Accounting/Security.'},
  {q:'الهدف من أمن المعلومات يشمل؟',opts:['السرية والسلامة والإتاحة','السرعة فقط','اللون','الوزن'],ans:0,exp:'CIA.'},
  {q:'مكافحة الفيروسات من؟',opts:['عمليات أمن الشبكات','التوجيه','التبديل','العنونة'],ans:0,exp:'من عمليات الأمن الأساسية.'},
 ]},

{file:'part11-practical.html',id:'net_p11',icon:'⌨️',part:'الجزء العملي',
 title:'التدريب العملي (إعداد الأجهزة)',sub:'واجهة الأوامر CLI — أوضاع الإعداد — أوامر سيسكو الأساسية والتحقق',
 tags:['Cisco CLI','أوضاع الإعداد','show / config'],
 match:[
  {a:'Router>',b:'وضع المستخدم (User EXEC) — عرض محدود'},
  {a:'Router#',b:'الوضع المتميّز (Privileged EXEC) بعد enable'},
  {a:'Router(config)#',b:'وضع الإعداد العام بعد configure terminal'},
  {a:'enable',b:'الأمر للانتقال للوضع المتميّز'},
  {a:'show running-config',b:'يعرض الإعدادات الجارية في الذاكرة'},
  {a:'copy run start',b:'يحفظ الإعدادات الجارية إلى startup-config'},
 ],
 table:[
  {item:'الانتقال للوضع المتميّز',ans:'enable',opts:['enable','exit','ping']},
  {item:'الدخول لوضع الإعداد العام',ans:'configure terminal',opts:['configure terminal','show','reload']},
  {item:'حفظ الإعدادات الدائمة',ans:'copy run start',opts:['copy run start','erase','debug']},
  {item:'اختبار الاتصالية',ans:'ping',opts:['ping','vlan','clock']},
  {item:'عرض حالة المنافذ',ans:'show ip interface brief',opts:['show ip interface brief','banner','hostname']},
  {item:'رمز وضع إعداد المنفذ',ans:'(config-if)#',opts:['>','(config-if)#','#']},
 ],
 scen:[
  {q:'أنت في Router> وتريد صلاحيات كاملة. أي أمر تكتب؟',ans:'enable',opts:[{n:'enable',i:'🔑',d:''},{n:'exit',i:'🚪',d:''},{n:'ping',i:'📡',d:''},{n:'show',i:'👁️',d:''}],explain:'enable ينقلك إلى الوضع المتميّز (#).'},
  {q:'أنهيت الإعداد وتريد ألّا يضيع بعد إعادة التشغيل. أي أمر؟',ans:'copy run start',opts:[{n:'copy run start',i:'💾',d:''},{n:'reload',i:'♻️',d:''},{n:'erase',i:'🗑️',d:''},{n:'debug',i:'🐞',d:''}],explain:'copy running-config startup-config يحفظ في NVRAM.'},
  {q:'تريد التحقق من عناوين IP وحالة كل المنافذ بسرعة. أي أمر؟',ans:'show ip interface brief',opts:[{n:'show ip interface brief',i:'📋',d:''},{n:'ping',i:'📡',d:''},{n:'hostname',i:'🏷️',d:''},{n:'clock',i:'⏰',d:''}],explain:'show ip interface brief يعطي ملخص حالة المنافذ.'},
  {q:'الرمز Router(config-if)# يعني أنك في وضع؟',ans:'إعداد منفذ',opts:[{n:'إعداد منفذ',i:'🔌',d:''},{n:'المستخدم',i:'👤',d:''},{n:'المتميّز',i:'🔑',d:''},{n:'الإقلاع',i:'⚙️',d:''}],explain:'(config-if)# = وضع إعداد واجهة/منفذ.'},
 ],
 quiz:[
  {q:'الأمر للانتقال للوضع المتميّز؟',opts:['enable','exit','login','start'],ans:0,exp:'enable.'},
  {q:'الرمز # يدل على؟',opts:['وضع المستخدم','الوضع المتميّز','إعداد منفذ','الإقلاع'],ans:1,exp:'Privileged EXEC.'},
  {q:'الدخول لوضع الإعداد العام؟',opts:['configure terminal','show run','ping','reload'],ans:0,exp:'configure terminal.'},
  {q:'حفظ الإعدادات الدائمة؟',opts:['erase','copy run start','debug','no shut'],ans:1,exp:'copy running-config startup-config.'},
  {q:'اختبار الاتصالية بين جهازين؟',opts:['ping','vlan','clock','banner'],ans:0,exp:'ping.'},
  {q:'عرض الإعدادات الجارية؟',opts:['show running-config','erase','reload','debug'],ans:0,exp:'show running-config.'},
  {q:'الرمز (config-if)# هو وضع؟',opts:['المستخدم','إعداد منفذ','الإقلاع','عرض'],ans:1,exp:'إعداد واجهة.'},
  {q:'ملخص حالة المنافذ وعناوينها؟',opts:['show ip interface brief','hostname','clock','login'],ans:0,exp:'show ip interface brief.'},
 ]},

{file:'capstone.html',id:'net_cap',icon:'🏆',part:'الاختبار الشامل',
 title:'الاختبار الشامل النهائي',sub:'مراجعة شاملة لكل أجزاء الكتاب العشرة + التدريب العملي',
 tags:['كل الأجزاء','تقييم نهائي'],
 match:[
  {a:'LAN',b:'شبكة محلية داخل مبنى'},
  {a:'WAN',b:'شبكة واسعة بين المواقع البعيدة'},
  {a:'Switch',b:'جهاز الطبقة 2 يحوّل بعناوين MAC'},
  {a:'Router',b:'جهاز الطبقة 3 يوجّه بعناوين IP'},
  {a:'OSI',b:'نموذج مرجعي من 7 طبقات'},
  {a:'Fiber',b:'وسط ضوئي للمسافات الطويلة'},
  {a:'OSPF',b:'بروتوكول توجيه حالة رابط'},
  {a:'VLAN',b:'تقسيم منطقي للسويتش'},
 ],
 table:[
  {item:'عنوان MAC — الطبقة',ans:'2',opts:['1','2','3']},
  {item:'عنوان IP — الطبقة',ans:'3',opts:['2','3','4']},
  {item:'موصل النحاس',ans:'RJ-45',opts:['RJ-45','LC','BNC']},
  {item:'منفذ WAN التقليدي',ans:'Serial',opts:['Serial','Console','USB']},
  {item:'يعتمد عدد القفزات',ans:'RIP',opts:['RIP','OSPF','EIGRP']},
  {item:'المضيفون في /26',ans:'62',opts:['30','62','126']},
 ],
 scen:[
  {q:'مدرسة تربط 40 جهازاً في مبنى وتفصل المعامل عن الإدارة منطقياً. الحل الأمثل؟',ans:'Switch + VLANs',opts:[{n:'Switch + VLANs',i:'🔀',d:''},{n:'Hub فقط',i:'🔁',d:''},{n:'WAN',i:'🌍',d:''},{n:'Crossover',i:'❎',d:''}],explain:'سويتش مع VLANs يربط الأجهزة ويفصل الأقسام منطقياً.'},
  {q:'ربط مبنيين تفصلهما 2 كم بأعلى سرعة. ما الوسط؟',ans:'Single-Mode Fiber',opts:[{n:'UTP',i:'🟫',d:''},{n:'Single-Mode Fiber',i:'🔦',d:''},{n:'Coaxial',i:'🟠',d:''},{n:'Wi-Fi',i:'📶',d:''}],explain:'المسافات الطويلة تتطلب فايبر أحادي النمط.'},
  {q:'جهاز يصل للأجهزة المحلية لكن لا يصل للإنترنت. الأرجح المشكلة في؟',ans:'البوابة/الراوتر',opts:[{n:'الكابل',i:'🧵',d:''},{n:'البوابة/الراوتر',i:'🚪',d:''},{n:'VLAN',i:'🏷️',d:''},{n:'MAC',i:'🔖',d:''}],explain:'وصول محلي بلا إنترنت يشير لمشكلة البوابة/التوجيه.'},
  {q:'تريد رابطاً مخصّصاً دائماً بين فرعين. ما الخيار؟',ans:'Leased Line',opts:[{n:'Leased Line',i:'📌',d:''},{n:'DSL',i:'🏠',d:''},{n:'Wi-Fi',i:'📶',d:''},{n:'PAN',i:'📱',d:''}],explain:'الخط المحجوز رابط دائم مخصّص.'},
 ],
 quiz:[
  {q:'كم طبقة في OSI؟',opts:['4','5','7','9'],ans:2,exp:'سبع.'},
  {q:'السويتش في الطبقة؟',opts:['1','2','3','4'],ans:1,exp:'الطبقة 2.'},
  {q:'الراوتر يوجّه حسب؟',opts:['MAC','IP','VLAN','المنفذ'],ans:1,exp:'عناوين IP.'},
  {q:'موصل النحاس؟',opts:['RJ-45','LC','SC','ST'],ans:0,exp:'RJ-45.'},
  {q:'منفذ WAN التقليدي؟',opts:['Console','Serial','USB','HDMI'],ans:1,exp:'Serial.'},
  {q:'TCP مقابل UDP؟',opts:['كلاهما غير موثوق','TCP موثوق وUDP سريع','UDP موثوق','لا فرق'],ans:1,exp:'TCP موثوق، UDP سريع.'},
  {q:'المضيفون في /24؟',opts:['254','256','128','62'],ans:0,exp:'254.'},
  {q:'PPP يدعم؟',opts:['المصادقة على WAN','التبديل','الطباعة','التشفير الكامل للقرص'],ans:0,exp:'المصادقة.'},
  {q:'الفايبر يتميّز بـ؟',opts:['تأثره بالتشويش','مناعة ضد EMI ومسافات','قصر المدى','بطء'],ans:1,exp:'مناعة وسرعة ومسافات.'},
  {q:'VLAN تعطينا؟',opts:['تصادمات','فصل منطقي وأمان','إبطاء','حذف عناوين'],ans:1,exp:'فصل منطقي.'},
  {q:'RIP يعتمد؟',opts:['الكلفة','عدد القفزات','حالة الرابط','عشوائي'],ans:1,exp:'عدد القفزات.'},
  {q:'أمن المعلومات يهدف لـ؟',opts:['السرية والسلامة والإتاحة','السرعة فقط','اللون','لا شيء'],ans:0,exp:'CIA Triad.'},
 ]},
];

/* ============ القالب (مستقل بالكامل: CSS + JS مضمّنان) ============ */
const CSS=fs.readFileSync(__dirname+'/_styles.css','utf8');
const ENGINE=fs.readFileSync(__dirname+'/_engine.js','utf8');

function navLinks(cur){
  return LABS.map((l,i)=>{
    const lbl=(l.id==='net_cap')?'الشامل':(i+1);
    return `<a href="${l.file}"${l.id===cur?' style="color:#e8c13a"':''}>${lbl} ${l.title.split('(')[0].trim().slice(0,14)}</a>`;
  }).join('\n    ');
}
function calcTab(){return `
<div class="tab-content" id="tabC"><div class="container"><div class="card">
  <h2>🧮 حاسبة التقسيم (Subnetting)</h2>
  <p class="subtitle">أدخل عنوان IP وطول البادئة لحساب تفاصيل الشبكة الفرعية.</p>
  <div style="display:grid;grid-template-columns:2fr 1fr auto;gap:10px;align-items:end;margin-bottom:16px">
    <div><label style="font-size:.8rem;color:var(--text2)">عنوان IP</label><input id="ip-in" value="192.168.1.10" style="width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:8px;font-size:.9rem"></div>
    <div><label style="font-size:.8rem;color:var(--text2)">Prefix (/)</label><input id="pfx-in" type="number" min="1" max="32" value="26" style="width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:8px;font-size:.9rem"></div>
    <button class="btn btn-primary" onclick="calcSubnet()">احسب</button>
  </div>
  <div id="calc-out"></div>
</div></div></div>`;}

function page(l){
  const tabs=[
    {lbl:'مطابقة',on:0},{lbl:'تصنيف',on:1},{lbl:'سيناريوهات',on:2}
  ];
  let tabBtns=`<button class="tab-btn active" onclick="switchTab(this,'0')">مطابقة</button>
  <button class="tab-btn" onclick="switchTab(this,'1')">تصنيف</button>
  <button class="tab-btn" onclick="switchTab(this,'2')">سيناريوهات</button>`;
  if(l.calc)tabBtns+=`\n  <button class="tab-btn" onclick="switchTab(this,'C')">حاسبة</button>`;
  tabBtns+=`\n  <button class="tab-btn" onclick="switchTab(this,'3')">اختبار المعرفة</button>`;
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${l.part} – ${l.title} | المختصر المفيد</title>
<style>
${CSS}</style>
</head>
<body>
<canvas id="net-canvas"></canvas>
<div class="topbar">
  <div class="topbar-brand"><div class="logo">🌐</div>المختصر المفيد · مختبرات الشبكات</div>
  <div class="topbar-links">
    <a href="index.html">الرئيسية</a>
    ${navLinks(l.id)}
  </div>
</div>
<div class="lab-header">
  <div class="lab-badge">${l.part}</div>
  <h1>${l.icon} ${l.title}</h1>
  <p>${l.sub}</p>
  <div class="chapter-tags">${l.tags.map(t=>`<span class="chapter-tag">${t}</span>`).join('')}</div>
</div>
<div class="nav-bar">
  <a href="index.html" class="back-link">→ العودة للمختبرات</a>
  <div style="display:flex;align-items:center;gap:10px">
    <span class="score-chip">الاختبار: <span id="stotal">0</span>/${l.quiz.length}</span>
    <button class="btn btn-ghost btn-sm" onclick="resetAll()">إعادة ضبط</button>
    <button class="btn btn-primary btn-sm" onclick="saveScore()">حفظ</button>
  </div>
</div>
<div class="tabs-wrapper">
  ${tabBtns}
</div>
<div class="tab-content active" id="tab0"><div class="container"><div class="card">
  <h2>🔗 طابق المصطلح بتعريفه</h2><p class="subtitle">انقر مصطلحاً من اليمين ثم تعريفه من اليسار.</p>
  <div class="score-badge" id="m-score">تمت المطابقة: 0 / 0</div>
  <div class="match-container"><div><div class="match-col"><h4>المصطلح</h4></div><div id="m-left"></div></div><div><div class="match-col"><h4>التعريف</h4></div><div id="m-right"></div></div></div>
  <button class="btn btn-ghost btn-sm" onclick="buildMatch()">إعادة تعيين</button><div id="m-feedback" style="margin-top:12px"></div>
</div></div></div>
<div class="tab-content" id="tab1"><div class="container"><div class="card">
  <h2>🔍 صنّف كل بند</h2><p class="subtitle">اختر التصنيف الصحيح لكل بند.</p>
  <table><thead><tr><th>البند</th><th>التصنيف</th><th>الحالة</th></tr></thead><tbody id="t-tbody"></tbody></table>
  <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary" onclick="checkTable()">تحقق</button><button class="btn btn-ghost btn-sm" onclick="buildTable()">إعادة تعيين</button></div>
  <div id="t-feedback" style="margin-top:12px"></div>
</div></div></div>
<div class="tab-content" id="tab2"><div class="container"><div class="card">
  <h2>🗺️ سيناريوهات عملية</h2><p class="subtitle">اختر الإجابة المناسبة لكل سيناريو.</p>
  <div class="score-badge" id="s-score">النتيجة: 0 / 0</div>
  <h3 id="s-num">السيناريو 1</h3><p id="s-q" style="margin:12px 0;line-height:1.7"></p>
  <div class="net-grid" id="s-options"></div><div id="s-feedback" style="margin-top:12px"></div>
  <button class="btn btn-primary" id="s-next" onclick="nextScenario()" style="margin-top:16px;display:none">التالي ←</button>
</div></div></div>
${l.calc?calcTab():''}
<div class="tab-content" id="tab3"><div class="container"><div class="card">
  <h2>📝 اختبار المعرفة</h2><p class="subtitle">${l.quiz.length} أسئلة. تُحفظ نتيجتك تلقائياً.</p>
  <div class="score-badge" id="quiz-score">النتيجة: 0 / ${l.quiz.length}</div>
  <div class="prog-wrap"><div class="prog-fill" id="quiz-prog" style="width:0%"></div></div><div id="quiz-container"></div>
</div></div></div>
<footer><p>صُمِّمت بواسطة <strong>م. عبدالله الأسمري</strong> · مختبرات «المختصر المفيد في شبكات الكمبيوتر» — محمود يوسف أسعد</p></footer>
<script>
var LAB_ID=${JSON.stringify(l.id)};
var MATCH=${JSON.stringify(l.match)};
var TABLE=${JSON.stringify(l.table)};
var SCEN=${JSON.stringify(l.scen)};
var QUIZ=${JSON.stringify(l.quiz)};
${ENGINE}
</script>
</body>
</html>
`;
}

/* ============ index.html ============ */
function indexPage(){
  const colors=['#006633,#00843d','#5b21b6,#7c3aed','#0e7490,#22d3ee','#92400e,#f59e0b','#155e75,#06b6d4','#7f1d1d,#ef4444','#854d0e,#eab308','#134e4a,#14b8a6','#3730a3,#6366f1','#9f1239,#fb7185','#334155,#64748b','#c9a227,#e8c13a,#c9a227'];
  const bgs=['#e8f5ee','#f0ebff','#cffafe','#fef3c7','#cffafe','#fee2e2','#fef9c3','#ccfbf1','#e0e7ff','#ffe4e6','#e2e8f0','#fefce8'];
  const cards=LABS.map((l,i)=>`    {f:'${l.file}',id:'${l.id}',n:'${l.part}',t:${JSON.stringify(l.title)},d:${JSON.stringify(l.sub)},tags:${JSON.stringify(l.tags)},icon:'${l.icon}',bg:'${bgs[i]}',stripe:'linear-gradient(90deg,${colors[i]})'}`).join(',\n');
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>مختبرات «المختصر المفيد في شبكات الكمبيوتر» التفاعلية</title>
<style>
${CSS}
.hero{text-align:center;padding:40px 20px 32px}
.hero-badge{display:inline-flex;gap:8px;background:var(--accent);color:#fff;border-radius:30px;padding:6px 20px;font-size:.75rem;font-weight:700;margin-bottom:20px}
.hero h2{font-size:clamp(1.4rem,4vw,2.2rem);font-weight:800;color:var(--accent);margin-bottom:10px}
.hero p{font-size:.95rem;color:var(--text2);max-width:620px;margin:0 auto 22px;line-height:1.8}
.stats-bar{display:flex;justify-content:center;background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;max-width:760px;margin:0 auto}
.stat{flex:1;min-width:90px;text-align:center;padding:16px 8px;border-left:1px solid var(--border)}
.stat:last-child{border-left:none}.stat-num{display:block;font-size:1.7rem;font-weight:800;color:var(--accent)}
.stat-label{display:block;font-size:.7rem;color:var(--text2);margin-top:2px}
.book-banner{background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:16px;padding:20px 28px;display:flex;gap:20px;align-items:center;margin:28px auto;max-width:1000px;flex-wrap:wrap}
.book-banner .bi{font-size:42px}.book-banner h3{color:#e8c13a;font-size:.95rem;margin-bottom:6px}.book-banner p{color:rgba(255,255,255,.85);font-size:.82rem;line-height:1.7}
.section-title{max-width:1100px;margin:0 auto 18px;font-size:1.15rem;font-weight:800;color:var(--accent);display:flex;align-items:center;gap:12px}
.section-title::before{content:'';width:4px;height:22px;background:#c9a227;border-radius:4px}
.section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--border),transparent)}
.labs-grid{max-width:1100px;margin:0 auto 40px;display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:18px}
.lab-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;text-decoration:none;color:var(--text);display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s;box-shadow:0 2px 8px rgba(0,102,51,.06)}
.lab-card:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,102,51,.15)}
.lab-card-stripe{height:4px}.lab-card-h{padding:18px 18px 12px;display:flex;gap:13px;align-items:flex-start}
.lab-ic{width:50px;height:50px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:23px;flex-shrink:0}
.lab-n{font-size:.7rem;font-weight:700;color:var(--accent);opacity:.8;margin-bottom:3px}.lab-card-h h2{font-size:.98rem;line-height:1.35}
.lab-card-b{padding:0 18px 12px;flex:1}.lab-card-b p{font-size:.8rem;color:var(--text2);line-height:1.6}
.lab-tags{padding:0 18px 14px;display:flex;flex-wrap:wrap;gap:6px}.lab-tag{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:3px 9px;font-size:.66rem;color:var(--accent);font-weight:600}
.lab-prog{padding:0 18px 12px}.lab-prog-row{display:flex;justify-content:space-between;font-size:.7rem;margin-bottom:5px}.lab-prog-bar{background:rgba(0,102,51,.1);border-radius:20px;height:6px;overflow:hidden}.lab-prog-fill{height:100%;background:linear-gradient(90deg,#006633,#00843d)}
.lab-card-f{padding:13px 18px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:var(--surface2)}
.lab-ch{font-size:.74rem;color:var(--text2);font-weight:600}.lab-open{font-size:.78rem;font-weight:700;padding:6px 14px;border-radius:8px;background:var(--accent);color:#fff}
.reset-all{display:inline-flex;gap:8px;background:rgba(180,40,40,.08);border:1px solid rgba(180,40,40,.3);color:#8b1a1a;border-radius:10px;padding:8px 18px;font-size:.8rem;font-weight:700;cursor:pointer;margin-top:14px}
.sfoot{background:var(--accent);padding:22px;text-align:center;margin-top:20px}.sfoot p{color:rgba(255,255,255,.8);font-size:.78rem;line-height:2}.sfoot strong{color:#e8c13a}
</style>
</head>
<body>
<canvas id="net-canvas"></canvas>
<div class="lab-header" style="padding-bottom:10px">
  <h1 style="font-size:1.6rem">🌐 مختبرات «المختصر المفيد في شبكات الكمبيوتر»</h1>
  <p>مبنية على أجزاء كتاب: م. محمود يوسف أسعد · إعداد: م. عبدالله الأسمري</p>
</div>
<div style="padding:30px 20px">
  <div class="hero">
    <div class="hero-badge">🎓 ${LABS.length} مختبراً تفاعلياً · مطابقة لأجزاء الكتاب</div>
    <h2>تعلّم الشبكات بالتطبيق العملي</h2>
    <p>محاكاة تفاعلية لكل جزء من أجزاء الكتاب — مطابقة • تصنيف • سيناريوهات • اختبار، مع حفظ النتائج تلقائياً.</p>
    <div class="stats-bar">
      <div class="stat"><span class="stat-num">${LABS.length}</span><span class="stat-label">مختبر تفاعلي</span></div>
      <div class="stat"><span class="stat-num">10</span><span class="stat-label">أجزاء الكتاب</span></div>
      <div class="stat"><span class="stat-num">${LABS.reduce((s,l)=>s+l.quiz.length+l.match.length+l.table.length+l.scen.length,0)}+</span><span class="stat-label">تمرين وسؤال</span></div>
      <div class="stat"><span class="stat-num">100%</span><span class="stat-label">يعمل بدون إنترنت</span></div>
    </div>
    <div id="psum" style="margin-top:14px;font-size:.85rem;color:var(--accent);font-weight:700"></div>
    <button class="reset-all" onclick="if(confirm('حذف جميع النتائج المحفوظة؟')){Object.keys(localStorage).filter(k=>k.indexOf('net_')===0).forEach(k=>localStorage.removeItem(k));location.reload();}">🗑️ إعادة تعيين جميع النتائج</button>
  </div>
  <div class="book-banner">
    <div class="bi">📘</div>
    <div><h3>المرجع: المختصر المفيد في شبكات الكمبيوتر — محمود يوسف أسعد</h3>
    <p>مختبرات تعليمية أصلية تحوّل مفاهيم الكتاب (أجزاؤه العشرة + التدريب العملي) إلى محاكاة تفاعلية تعمل في المتصفح مباشرةً دون أي برنامج إضافي.</p></div>
  </div>
  <div class="section-title">المختبرات (مطابقة لأجزاء الكتاب)</div>
  <div class="labs-grid" id="grid"></div>
</div>
<div class="sfoot"><p>تصميم <strong>م. عبدالله الأسمري</strong> · aalasmari0350@stu.kau.edu.sa<br>جميع المحاكاة لأغراض تعليمية أكاديمية فقط</p></div>
<script>
var LABS=[
${cards}
];
function render(){var done=0,sum=0;
 document.getElementById('grid').innerHTML=LABS.map(function(l){
  var s=JSON.parse(localStorage.getItem(l.id)||'null');var prog='';
  if(s){done++;sum+=s.pct;prog='<div class="lab-prog"><div class="lab-prog-row"><span>نتيجة الاختبار</span><span style="font-weight:700">'+s.score+'/'+s.total+' ('+s.pct+'%)</span></div><div class="lab-prog-bar"><div class="lab-prog-fill" style="width:'+s.pct+'%"></div></div></div>';}
  return '<a href="'+l.f+'" class="lab-card"><div class="lab-card-stripe" style="background:'+l.stripe+'"></div>'+
   '<div class="lab-card-h"><div class="lab-ic" style="background:'+l.bg+'">'+l.icon+'</div><div><div class="lab-n">'+l.n+'</div><h2>'+l.t+'</h2></div></div>'+
   '<div class="lab-card-b"><p>'+l.d+'</p></div>'+
   '<div class="lab-tags">'+l.tags.map(function(t){return '<span class="lab-tag">'+t+'</span>';}).join('')+'</div>'+prog+
   '<div class="lab-card-f"><span class="lab-ch">'+l.n+'</span><span class="lab-open">فتح ←</span></div></a>';
 }).join('');
 if(done>0)document.getElementById('psum').textContent='أكملت '+done+' من '+LABS.length+' مختبرات · متوسط النتيجة '+Math.round(sum/done)+'%';
}
render();
${ENGINE_CANVAS()}
</script>
</body>
</html>
`;
}
function ENGINE_CANVAS(){return fs.readFileSync(__dirname+'/_canvas.js','utf8');}

/* ============ التوليد ============ */
LABS.forEach(l=>{fs.writeFileSync(__dirname+'/'+l.file,page(l),'utf8');});
fs.writeFileSync(__dirname+'/index.html',indexPage(),'utf8');
console.log('Generated '+LABS.length+' labs + index.html');

