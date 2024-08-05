var options = {
  distID: "latest",
  solution3DName: "suitcase-color",
  projectName: "resources-for-videos-and-marketing-purposes",
  solution3DID: "62766",
  containerID: "container3d",
  enableTouch: true,


  onPointerClick: function (objectsClick) {
    if (objectsClick.length > 0) {
      if (objectsClick[0].type == "annotation") {
        switch (objectsClick[0].shortName) {
          case "Open":
            openSuitcase();
            break;
          case "Close":
            closeSuitcase();
          case "Wheel spinner on":
            wheelSpinnerOn();
            break;
          case "Wheel spinner off":
            wheelSpinnerOff();
            break;
          case "Extend handle":
            extendHandle();
            break;
          case "Retract handle":
            retractHandle();
            break;
          default:
            break;
        }
      }
    }
  },
};

let configuration = {
  annotations: {
    hide: ["Open", "Extend handle", "Wheel spinner on"],
  },
  camera: $(window).width() < 880 ? "Camera Mobile" : "Camera Desktop",
};

Unlimited3D.init(options, configuration);


function activateCameraBasedOnWidth() {
  if ($(window).width() < 880) {
    Unlimited3D.activateCamera({ name: "Camera Mobile" });
  } else {
    Unlimited3D.activateCamera({ name: "Camera Desktop" });
  }
}

$(document).ready(function () {
  // Call Camera function on page load
  activateCameraBasedOnWidth();
  $(window).resize(function () {
    activateCameraBasedOnWidth();
    applyMarginBasedOnChange()
    applyMarginBasedOnChangeMobile();
  });
});

let selectedBodyColor =  "06 CHROME SATIN ALUMINUM"
let previousBodyColor = "";
let selectedCornerColor = "";
let selectedHandleColor = "";
let selectedWheelsColor = "";

 
function applyMarginBasedOnChangeMobile() {
  const isMobile = window.matchMedia("(max-width: 880px)").matches;
  const isActiveAnimation = $(".animations-btn.active").length > 0;
  const isActiveConfigurator = $(".configurator-btn.active").length > 0;
  const isCheckedRadio = $('.lower-btns input[type="radio"]:checked').length > 0;

  if (isMobile) {
    if (isCheckedRadio) {
        $("#container3d").css("margin-top", "-145px");
        $(".lower-btns").css({ "display": "none" });

    } else {
        $(".lower-btns").css("display", "flex");
      $("#container3d").css("height", "100vh");
    }
  } else {
    $("#container3d").css({ "margin-top": "0"});
    $(".lower-btns").css("display", "flex");
  }
  if (!isCheckedRadio) {
      $("#container3d").css("margin-right", "0");
  }
  if (isActiveAnimation) {
    $(".lower-btns").css("display", "none");
    $("#color-picker").css("display", "none");
    $(".upper-btns").css("display", "flex");
    $("#container3d").css({
      "margin-right": "0",
      width: "100%",
      height: "100vh",
    });
    $("#container3d").css({ "margin-top": "0"});

    $('.lower-btns input[type="radio"]:checked').prop("checked", false);
    Unlimited3D.showAnnotations({
      annotationObjects: [
        {
          annotations: ["Open", "Wheel spinner on", "Extend handle"],
        },
      ],
    });
  }
  if (isActiveConfigurator) {
    Unlimited3D.hideAnnotations({
      annotations: ["Open","Close","Wheel spinner on","Wheel spinner off", "Extend handle","Retract handle"
],
    });


  }
}


function applyMarginBasedOnChange() {
    const colorPicker = $("#color-picker");
    const colorOptions = $(".color-options");
    const container3d = $("#container3d");

  if (window.matchMedia("(max-width: 1000px)").matches) {
    container3d.css("margin-right", "25%");
    colorPicker.css({ right: "-106px", width: "260px" });
    colorOptions.css("column-gap", "15px");
  } else if (window.matchMedia("(max-width: 1210px)").matches) {
    colorPicker.css({ right: "-85px", width: "270px" });
    colorOptions.css("column-gap", "15px");
    container3d.css("margin-right", "20%");

  } else {
    container3d.css("margin-right", "0");
    container3d.css("margin-right", "0");
    colorPicker.css("right", "35px");
  }
}


// event that define any chage on suitcase parts
$('.lower-btns input[type="radio"]').on("change", function () {
    const isMobile = window.matchMedia("(max-width: 880px)").matches;
  const selectedValue = event.target.value;
  handleRadioChange(selectedValue);
  if(isMobile) {
    $('#color-picker').css('display', 'flex')
  }else{
 $('#color-picker').css('display', 'flex').hide().fadeIn('fast');
  }
  applyMarginBasedOnChange();
  applyMarginBasedOnChangeMobile();


});
// logic for each suitcase part
function handleRadioChange(selectedValue) {
  switch (selectedValue) {
    case "body":
      bodyClicked();

      break;
    case "handles":
      handlesClicked();

      break;
    case "corners":
      cornersClicked();

      break;
    case "wheels":
      wheelsClicked();

      break;
    default:
      break;
  }
}
 
// next and previous btn order
const inputs = ["#body", "#corners", "#wheels", "#handles"];
let currentIndex = 0;

function setCurrentIndex(index) {
  currentIndex = index;
}

$(".next-btn").on("click", function () {
  currentIndex = (currentIndex + 1) % inputs.length;
  $(inputs[currentIndex]).click();
});
$(".prev-btn").on("click", function () {
  currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;
  $(inputs[currentIndex]).click();
});

inputs.forEach((input, index) => {
  $(input).on("click", function () {
    setCurrentIndex(index);
  });
});

const buttons = $(".configurator-btn, .animations-btn");


buttons.on("click", function() {
    $(".configurator-btn, .animations-btn").removeClass("active");
    $(this).addClass("active");
});


$(document).on("click", ".animations-btn.active", function () {
  activateCameraBasedOnWidth();
  applyMarginBasedOnChangeMobile();

});

$(document).on("click", ".configurator-btn.active", function () {
  activateCameraBasedOnWidth();
  applyMarginBasedOnChangeMobile();
 
});


 // animations
function openSuitcase() {
  Unlimited3D.activateModifier({ modifier: "open" });
  if (window.matchMedia("(max-width: 880px)").matches) {
    $("#container3d").css({ height: "60vh", "margin-top": "130px" });
  } else {
    $("#container3d").css({ height: "100%", "margin-top": "0" });
  }

  Unlimited3D.hideAnnotations(
    {
      annotations: ["Open", "Extend handle", "Wheel spinner off", "Wheel spinner on", ],
    },
    function () {
      Unlimited3D.showAnnotations({
        annotationObjects: [
          {
            annotations: ["Close"],
          },
        ],
      });
    }
  );
}


function closeSuitcase() {
$("#container3d").css({"height": "100vh", "margin-top": "0px" });
Unlimited3D.activateModifier({ modifier: "close" });
Unlimited3D.hideAnnotations(
    {
        annotations: ["Close"],
    },
    function () {
        Unlimited3D.showAnnotations({
            annotationObjects: [
                {
                    annotations: ["Open", "Extend handle", "Wheel spinner on"],
                },
            ],
        });
    }
);

}
function wheelSpinnerOn() {
    Unlimited3D.activateModifier({ modifier: "wheel_spinner_on" });
  Unlimited3D.hideAnnotations(
    {
      annotations: ["Open", "Extend handle", "Wheel spinner on"],
    },
    function () {
      Unlimited3D.showAnnotations({
        annotationObjects: [
          {
            annotations: ["Wheel spinner off"],
          },
        ],
      });
    }
  );
}

function wheelSpinnerOff() {
  Unlimited3D.activateModifier({ modifier: "wheel_spinner_off" });
  Unlimited3D.hideAnnotations(
    {
      annotations: ["Close"],
    },
    function () {
      Unlimited3D.showAnnotations({
        annotationObjects: [
          {
            annotations: ["Open", "Extend handle", "Wheel spinner on"],
          },
        ],
      });
    }
  );
}

function extendHandle() {
  Unlimited3D.activateModifier({ modifier: "extend_handle" });

  $(".upper-btns").css("display", "none");
  Unlimited3D.hideAnnotations(
    {
      annotations: [
        "Open",
        "Extend handle",
        "Wheel spinner off",
        "Wheel spinner on",
      ],
    },
    function () {
      Unlimited3D.showAnnotations({
        annotationObjects: [
          {
            annotations: ["Retract handle"],
          },
        ],
      });
    }
  );
}
function retractHandle() {
  Unlimited3D.activateModifier({ modifier: "retract_handle" });
  $(".upper-btns").css("display", "flex");
  Unlimited3D.hideAnnotations(
    {
      annotations: ["Retract handle"],
    },
    function () {
      Unlimited3D.showAnnotations({
        annotationObjects: [
          {
            annotations: ["Open", "Extend handle", "Wheel spinner on"],
          },
        ],
      });
    }
  );
}

function closeColorPicker() {
    $('#color-picker').css("display", "none");
    $("#container3d").css({"margin-right":"0" , "margin-top":"0" });
    $('.lower-btns input[type="radio"]:checked').prop("checked", false);
    $(".upper-btns").css("display", "flex");
    $(".lower-btns").css("display", "flex");
    $("#container3d").css("height", "100vh");
  if (window.matchMedia("(max-width: 880px)").matches) {
    Unlimited3D.activateModifier({ modifier: "default_camera_mobile" });
  } else {
    Unlimited3D.activateModifier({ modifier: "default_camera_desktop" });
  }
}

$(".close-popup").click(function () {
  closeColorPicker();
});

const colorCombinations = {
    '01 CHROME SATIN ROYAL BLUE': ['01 CHROME SATIN ROYAL BLUE', '05 CHROME SATIN MIDNIGHT BLACK', '06 CHROME SATIN ALUMINUM'],
    '02 CHROME SATIN OLIVE GREEN': ['02 CHROME SATIN OLIVE GREEN', '05 CHROME SATIN MIDNIGHT BLACK', '06 CHROME SATIN ALUMINUM'],
    '03 CHROME SATIN BURNT ORANGE': ['03 CHROME SATIN BURNT ORANGE', '05 CHROME SATIN MIDNIGHT BLACK', '06 CHROME SATIN ALUMINUM'],
    '04 CHROME SATIN CHERRY RED': ['04 CHROME SATIN CHERRY RED', '05 CHROME SATIN MIDNIGHT BLACK', '06 CHROME SATIN ALUMINUM'],
    '05 CHROME SATIN MIDNIGHT BLACK': ['05 CHROME SATIN MIDNIGHT BLACK', '06 CHROME SATIN ALUMINUM'],
    '06 CHROME SATIN ALUMINUM': ['05 CHROME SATIN MIDNIGHT BLACK', '06 CHROME SATIN ALUMINUM']
};

 // on body color selection depends other available color option for other parts. default for body is CHROME SATIN ALUMINUM. if user chose other body color then other parts reset to default color
function updateColorOptions(selectedColor) {
    const availableColors = colorCombinations[selectedColor];

    if (availableColors === undefined) return;

    $('.color-option').each(function() {
        const $option = $(this);
        if (availableColors.includes($option.data('color'))) {
            $option.show().removeClass('selected');
        } else {
            $option.hide();
        }
    });
}

function clearColorOptionEventListeners() {
    $('.color-option').each(function() {
        const $option = $(this);
        const $newOption = $option.clone(true);
        $option.replaceWith($newOption);
    });
}

function activateModifierBasedOnWidth(mobileModifier, desktopModifier) {
if (window.matchMedia('(max-width: 880px)').matches) {
    Unlimited3D.activateModifier({ modifier: mobileModifier });
} else {
    Unlimited3D.activateModifier({ modifier: desktopModifier });
}
}

    function bodyClicked() {

 $('.title-x .title').text('BODY COLOR')

 activateModifierBasedOnWidth("camera_body_mobile", "camera_body");

$('.upper-btns').css('display', 'none');

clearColorOptionEventListeners()
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        document.querySelector('.color-chosen').textContent = $('.color-option.selected').data('name');
        option.style.display = 'block';
        if (selectedBodyColor !== '') {
           
            if (option.dataset.color === selectedBodyColor) {
                option.classList.add('selected'); 
                
                Unlimited3D.changeMaterials({
                    partObjects: [
                        { parts: ['Body_metal_base', 'Body_metal_cover'], material: selectedBodyColor }
                    ]
                });
            } else {
                option.classList.remove('selected'); 
            }
        }else{
    Unlimited3D.changeMaterials({ partObjects: [ {parts: ['Body_metal_base', 'Body_metal_cover','Corners_base','Corners_cover','Handle_base1','Handle_metal-1','Handle_telescope-1','Wheels_base','Wheels_base_cover','Wheels_front_right_base','Wheels_front_left_base','Wheels_back_right_base','Wheels_back_left_base','Wheels_front_right_center','Wheels_front_left_center','Wheels_back_right_center','Wheels_back_left_centar'], material: '06 CHROME SATIN ALUMINUM'} ] });
        
}
if (selectedBodyColor == '' && (selectedCornerColor !== '' || selectedHandleColor !== '' || selectedWheelsColor !== '')) {
    option.classList.remove('selected');
    colorOptions[0].classList.add('selected');
    Unlimited3D.changeMaterials({
                partObjects: [
                    { parts: ['Body_metal_base', 'Body_metal_cover' ], material: '06 CHROME SATIN ALUMINUM' }
                ]
            });
}


        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            const element = this
    
            element.classList.add('selected');
            const newSelectedColor = element.dataset.color;
           

        if (newSelectedColor !== selectedBodyColor) {
            // Body color has changed
            selectedBodyColor = newSelectedColor; // Update the new selected color
            document.querySelector('.color-chosen').textContent = element.dataset.name;

            // Update body materials with the new color
            Unlimited3D.changeMaterials({
                partObjects: [
                    { parts: ['Body_metal_base', 'Body_metal_cover'], material: newSelectedColor }
                ]
            });
            Unlimited3D.changeMaterials({ partObjects: [ {parts: ['Corners_base', 'Corners_cover','Handle_base1','Handle_metal-1','Handle_telescope-1','Wheels_base','Wheels_base_cover','Wheels_front_right_base','Wheels_front_left_base','Wheels_back_right_base','Wheels_back_left_base','Wheels_front_right_center','Wheels_front_left_center','Wheels_back_right_center','Wheels_back_left_centar'], material: '06 CHROME SATIN ALUMINUM'} ] });

            selectedCornerColor = '06 CHROME SATIN ALUMINUM'
            selectedHandleColor = '06 CHROME SATIN ALUMINUM'
            selectedWheelsColor = '06 CHROME SATIN ALUMINUM'
        }

        });

    });
     
    }

  function setupColorOptions(partType, selectedColor, defaultColor, partObjects) {
const colorOptions = document.querySelectorAll('.color-option');
document.querySelector('.color-chosen').textContent = $('.color-option.selected').data('name');
colorOptions.forEach(option => {
    option.classList.remove('selected');
    if (selectedColor !== '') {
        if (option.dataset.color === selectedColor) {
            option.classList.add('selected');
            document.querySelector('.color-chosen').textContent = option.dataset.name;
        }
    } else {
        colorOptions[0].classList.add('selected');
        document.querySelector('.color-chosen').textContent = $('.color-option.selected').data('name');
    }

    if (previousBodyColor !== '' && selectedBodyColor !== previousBodyColor) {
        option.classList.remove('selected');
        colorOptions[0].classList.add('selected');
        Unlimited3D.changeMaterials({ partObjects: [{ parts: partObjects, material: defaultColor }] });
    } else {
        Unlimited3D.changeMaterials({ partObjects: [{ parts: partObjects, material: selectedColor }] });
    }

    option.addEventListener('click', function () {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        const newColor = this.dataset.color;

        // Set the correct global variable based on the part type
        switch (partType) {
            case 'corners':
                selectedCornerColor = newColor;
                break;
            case 'handles':
                selectedHandleColor = newColor;
                break;
            case 'wheels':
                selectedWheelsColor = newColor;
                break;
            default:
                break;
        }

        document.querySelector('.color-chosen').textContent = this.dataset.name;
        Unlimited3D.changeMaterials({ partObjects: [{ parts: partObjects, material: newColor }] });
    });
});
}

function cornersClicked() {
$('.title-x .title').text('CORNERS');
activateModifierBasedOnWidth("camera_corners_mobile", "camera_corners");
clearColorOptionEventListeners();
updateColorOptions(selectedBodyColor);
setupColorOptions('corners', selectedCornerColor, '06 CHROME SATIN ALUMINUM', ['Corners_base', 'Corners_cover']);
}

function handlesClicked() {
$('.title-x .title').text('HANDLES');
activateModifierBasedOnWidth("camera_handle_mobile", "camera_handle");
clearColorOptionEventListeners();
updateColorOptions(selectedBodyColor);
setupColorOptions('handles', selectedHandleColor, '06 CHROME SATIN ALUMINUM', ['Handle_base1', 'Handle_metal-1', 'Handle_telescope-1']);
}

function wheelsClicked() {
$('.title-x .title').text('WHEELS');
activateModifierBasedOnWidth("wheel_mobile", "wheel_desktop");
clearColorOptionEventListeners();
updateColorOptions(selectedBodyColor);
setupColorOptions('wheels', selectedWheelsColor, '06 CHROME SATIN ALUMINUM', [
    'Wheels_base', 'Wheels_base_cover', 'Wheels_front_right_base',
    'Wheels_front_left_base', 'Wheels_back_right_base', 'Wheels_back_left_base',
    'Wheels_front_right_center', 'Wheels_front_left_center',
    'Wheels_back_right_center', 'Wheels_back_left_centar'
]);
}
  
function handleImageDisplay(inputSelector, shouldDisplay) {
  $(inputSelector).click(function () {
    $(".no-image, .no-image-text").css( "display", shouldDisplay ? "flex" : "none" ); });
}

handleImageDisplay("input#handles, input#corners, input#wheels", false);
handleImageDisplay("input#body", true);

$(".left-btn").on("click", function () {
  $(".color-options").animate({ scrollLeft: "-=100px" }, "smooth");
});

$(".right-btn").on("click", function () {
  $(".color-options").animate({ scrollLeft: "+=100px" }, "smooth");
});
