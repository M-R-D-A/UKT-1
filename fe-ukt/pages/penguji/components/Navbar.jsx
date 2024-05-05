import React, { useEffect, useContext } from 'react'

//icon

import { BsPlusCircle } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";

import { IoBodyOutline } from "react-icons/io5";
import { IoBodySharp } from "react-icons/io5";
// import { RiGroup2Fill } from "react-icons/ri";
import { RiTableLine } from "react-icons/ri";
import { RiTableFill } from "react-icons/ri";

// import jurusSvg from '../components/jurus.svg';

const senamLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADDUlEQVR4nO2ZSWgUURCGPxcSwRXjMmpuetCrRNwu7h7GgCKi4kUJelCCC9GAiAHjclBxuXjQgzmJouBBUJBENEQFRYWoIIILRgWJihkZ19jy4G94NDNOZ3oy3S39QcFMvdc1r3j16lXXQML/zTKgFfgKZPQ5TczYDzh5pJkY7YQDfAcagAmSndI5cdmZNi3WOOFll8ZMmEWejBabyjGW0lgPMaBHizXh5GWSxr4QA1q1WHMmvDTGKbTS1mE3Z2KixDjxI06HHaXY2Kdfl7RCKBPnCzEhynWWUwJ5CxwCKqJSZwWVg2HWWaVgjrUzoddZQZgru11EoDwxdAQMrQPlcsT9wULjfZUuOVERNUcij5M4EjGcZEcihpPsSEx3pAE4DJwFrgB3VRXsBkYSA0d++7j8OoExRNyR7UALcFTv8BuAWmAWsBR4qOdPETJBb+7JQC+QBUYQIqUoQW7IxnpC5KMWUVVg3gBgIXBeFfNqa6xONq4TIle1iG15xsep1/Xcc8BN1nIZBXxTYjD9sFDYqIWZRtxWYLQWb9pAF6wGnZHXwF7tyB9gimXnkubsCMuRpgKptVchswoYrGdaNGacclkp3f2Q/OCclT6v6cxkrfd408T2sljjzyzdEOCz9NMIgUf68RmWbrZ0D/I8M1BNBTOnxtKfCaPFOl270at4t++ATVqQCaF8HNOc45ZuvnRPKQNLFPPuGfipGsrmpI/OSo3mvAcGSVdlhWS/YA7pOquccP+4OQJU57gvOjVnUQG7TzSvSdmuWd8f94cTJo2+shx4p5rJ5H4vw4ETmvcBqPRhO1dR+VI1Wck6KLWKfzdu6/IsLqXW5ifN/QWs8GHfXH4v/pG6O4DxpXDkngw2KtN4mQqctv6CNnJTlW0hKpXV3B1YA4yVrLWi4LZ1hgJ3EYflaGdeVsZyL72LwMw+2N6iZ9/kuWuqrRRtqodA3JGhPYr/5Z4WaFYXoV1q+MW1s9mHs20EZIGnVnKlG9inmqoY2otoobYHdWae4r5bFWs9MDSgzWIcuRXUkQTKyF+itY0E4QqeVAAAAABJRU5ErkJggg=="
const senamFill = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+UlEQVR4nO2ZTygEURyAv1CSQslJwkFOrpwkDiLEQY6Sk5yIk8hBinLhLIqrSBTl/664ODhz48Jhw+5KEU+jd3CY3X2zO7Pz3jZf/U4z7837+s289+b9ICC36QXOgbiMM6AHw1gARIKYx6BMiBTRjQGcK4icYgAxBZEoOSLyhgGcKYicYAA9CiJdGMJ8Eok5DKNbzk4xGScmZSIgwGOqgC258AkX4hHo9EMi4pKA+BcP2RbZ8kBC+CES9UiiI9siqQZlDCIQ0QwRZEQzRJARzRBBRgzLyCAwASwC68AecC1/vIbQCJFhjJEjIhGgEA1wY5PYhwa4sfu1fgV8Z0dxsLfAKDBgc+0DKPVbpB54STB4q06yCjT+u78AeLK5dxgNsGS25RmvdaYVAkaAkgT3L+t4rFqWRptGG5FvoBIfuQJWgCagWIpVK7S7s5GZxCfKEpQV1hTaztq0u8GHI6ClJFPvuEIfdTbt3skSDcAG8Jliqm1Os2x34fH4aQMOgB+F9cJ6PfIdZHYXeAWOgBqvBKyP9lJxwfsCNoEKh89olVWvd7nuWKWJFrdFjhUE4nLWqk2j/+kk/U5lax/1DMwA5RmU7JK9qj9Au1sihzYPuJerdlGGfV8oZHvfJY+/j/FQ7qWsGaYfyHOh37CDnXEYjXEiEvJ7sAE45BdWG/waUa/wzQAAAABJRU5ErkJggg=="
const jurusLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFTUlEQVR4nO2aCYhWZRSGH51MGxrTFsuMiBbNMLO0bIMyRAODysKgSFposw0piAwqaoJpsxIr2gzL9s2oyajMlqmcNjQt2yQnyzIzLJtGbZwbJ94Pztzu/f5lmPr/8IUL89/vfMu59yzvOXdgC8rCKGAx8CbQiypAT6A/MAg4GrgcWAB0AImu86lAvO0OGLtagGnARmAdMIwKV6QN+AX4CngRqAfGAzWSnya574HDqHLcJmU2AQ3AjlQxzgF+l0LrgYeAk4ABVCD6AL0j47sDd8ocE3etBT5ShHsVeBf4RnJN/+L5GaPN/9T1RgF/2A44FZgDLNWcvKBhCnU7zKFvcKHWnuBm/b0BOLLIdbYGdgL2AfYF9gAu1Dozu1mHvx32FefElynx1QL36n5zF9afqTVOppuzdos2+g44PDVuCv2ocVP4YOCgAv6TRrPm70UXsafs+GLgCnc1yGxsk7eAnXPmL3PmFuz9J+DcIvf/WXPsDZeNu4rM3q3AlaIpHsc4GVP6JeB950vnFXGGjZJPr100ztBmfwDPKVw26JoOzAYaFU3CYee5JHeayxdGGge7tSe5cLtVgXOskez25ShhyelXLXBmEfJjgdWSX6lwGpR7OMcsPtH4sAJrL5TcUeUococmv1zCnF2VN4ICZg6XRuQ/lNzQAuveIrlrKREDZc92kAPLyCf1Loe8kGMS47S+yY11xDIvMoaoWFI9U6+Jcykf4xWZbJ0vlOAMPYCpGdTka+CAyHpNkou94U6odeEulo331queGAm7g8SbEq1pOeRJd3gLFDcrENjvbyMhdiTQruARHkoUU7SoOVgeLMosSj1Rq0FmZSStWkW8xJlbqyJaQG/gPY2dXYSlLJf5R7GsCDowVTIrZLdeodV6egH9gHdSCg/PWPMijc+I7Gt55FnJRZnwSAn9EHG+3YDfJDdO5mV/v666IhGDfQa4x9GTRGZlimXhVslcFzug3liiiJeLqyR0X0TmQck8od9DnH33UHMh/ZY2FMjgE5S9EzGBPNQocCSak4tgy1bB5cGo+ufKGQErNW+w2/AxV58fEjGVa5zvBD42IyfMHisZ86covpRg3sZ5aNS8E929Vbp3aM6c/m5eBzAfeFqBIBEzSOMmjRlhjUaiTRLMs+M83K155rAhUiUKlVkYociTqOtynBsbLm6XZITZkEssjEfzQog6pWJ6xpNaq3v7p2RPdwf9WCVCGk9p/PjU/UBOo02KYH/lFPgPaK7loDRXW66kOSZFJC3nbJOz3ms5Dh1IbJSmXOI2KBULNPcEd6+vuiDpuqWtQDCZLJ8xX6lLjYVQnr7fCfdLyPq1paDOOeguGX43ydUTKyIktAa40RVcWcp+VgztD5zITKwUTHaFUxYGKEG25fhDkJnv3tpmdVPSmKtxT286oZ8IWUeJLUx74ksK5J4jXE2fhdEuD4Xr0QIJ24JLJiZK4FNKw/XOoa2zmAWf+dNOeoHL6OscvbF+VqwuMcqfieclYLV4sajVW2zPaAF59HA0fY7YsR30EfcGZushJmIOMSxSndMrS8t22WWpfSOLdKcUITfaNSH8ZfnkLBeWF+f4RvoBGiv4B5a6BkF3Yqj41yqxayOd+znWu0ZmWDaaFbFKpSVdRU/XCm2t1g8/fdWUCEpMoAoxSmVAKOBKZdr/OSznXO0Y9hJ9MqgqmP1/4GqP2yOEsSIxRFk68KeWAqVsRaFOuWWeU6BVTYVtqXAM1LeOxlQHcb0+S1jnpaIxQnW2bx60qzU0RR86Kxp91Ahod7X546LXO1BFWPh/+e+FJrFQ3xrdArqAvwCix+vY0vUdbgAAAABJRU5ErkJggg=="
const jurusFill = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGElEQVR4nO2ZeYhXVRTHP78ZJ81pwRYr26xsMdtoKrHICqOSCIwiotVoMcjqj2xhStocWsgmcBpKhELaKYnoH6moyBZNK0O0jbTFstGidMqxxn5x5Hvj8ubd+97v/X6zRV84OL537vmdc5dzvuc++B8V4zhgOfA20MAgQB0wAtgbOBWYAbwJ/A2UJdcyAPGO52BMvgGagS3Ar8ARDPBANgO/AF8CrwKzgDOBeuk3S28tMIFBjlYF8ydwP7AbgxhXA50KaBMwHzgPGMkAxBBJCPsBj2o7+tvzZ2CZMtxrwHvAaukt6kP/t52JD7R1upW1xkf0dwYuAp4CVgB/RZKGBdTrsNmfnUi1TrqAU3La2Q7YHTgYOAwYDVwnO229HAPDgYUZKXglUCpov002zqcPYDM5KaO2jJFuE7BDBbYXa/xB1Tq5D3AhcDNwL9AC3ApMB84BDvcOdr10tqYEcox0Vilb3Zjz9zdovK18YcwJOJWU34BbvO1zBvCT994c315ca6P33CYjC1t09owCFcKVOSmIL68Au2j8KOAtPbcqbzg9oW9MYFiGH+ul6+xWhJGa5XIBWQOc4G21S/RvXeAMxdIzSuflCjJfKpUoKrYdrk/YbAnonpjhy0PSu6vSICyP/15lIE5eAHaSXasLnyfe23lpzNHPmO53GWyhB+6pURBOvvCou5HEJd67O/R8ggINYZH0b8gbRKP4TpZzRtVnAi8B63Lo28xP0W/sLwrzsLKcnR+rFd97q5dEkyhPp6p+JhwdiInxoaMT46zYXQF8HRm31XPC9SMWyDxPZ1rEt1nS+QrYKyuQVTkCsZl0M5s0OBboCIzrUCvsYNX9+YROW8Q3y3oLpBdlwk05grADt6P0jV/dqb+NnpzkBbMyMW6dl5JDOmVltjy1bWlMaUaOQMyQ4QL931bQsK+ohDuwQ9Qs3Q1cJbqON3ZTwP7xEf/qvax3diyQZ3MEMlsrt9Z7Zrcmhs/kZAi2Yk9HbLdKb0Sg2p8lvffJwEcF06v9AMpgbuY/BNqB24BHgE8zksBMHfySzo0FnMSD0jfCGkTJ66MrlWtko9VL4XnHrhfBdFun3Xt3KOm1JLb9tu3xckFxRapFmagkMpg1bol6d4OxidcT7y9N+Lhaz6OXFElWWolMlY029ezu79iYx4Ch0rVs9m2KTvK8ORLbUG0hDMlE2ViglIzOytIUXeNwl3u/O009fTmFdO6R8NExCJf+U+HvzUpko9e5/aBnztGh6gIXiorP8baSNVlPROw2p/jo6k70ytUncpXIkxp/ZILCWA8SwthIhuyOZKWXpXNxyPCwwPJmiTk8TjbmJt7ZBZthVzVE1q+fq1XoilCYSZEJuD1BkXpgSsHVcBT8wJQbQ0chDshpa7EyZ56+xEhjKp4pEESn8r7Ju4FD3ahUnHboQxksC59o5XpkrnEZ15QxaVcHmFUoxwe41R9e6i4pdWd90RqeYND/YnnBIPJIh+7EEJl8DvhRH36Mghyid5ZO52Z0iJlY1ouBuDY35qCl0o+B06gStkxv9HIwXaohVjj3VN9+sramfYqbTI3QkJI++0I26KNpzXFTzuvRWsiKWlxKxzC5ihvGPGJ3uI/nuMuqCY5SZql1EGtqcagrxSh1ebUIwOrFfZE7q16HFZ8Xqwhgs5KIqyX9ijrNZl7nu0UYp4cqcH9jqpqd0NYxin1Z0W8YfY2J3mewsgJ7QFR90GGMaI0x2mP72xn+S/gHDyPEL0+fCwYAAAAASUVORK5CYII="
const teknikLine = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD6ElEQVR4nO2Za4hVVRTHf5NjUo0pgTVFjglZ0YOYyiKDBEMtLcsKpA9G9K3sQYKDo0EvQYjAB+KkYFn5QUKxEgymFLSZwUo/REURPUihnHLGURof5XhkwX/DYrPvXHGO3HPt/uFy73rss/fa67XPvlDD+YNrgDXAfuBffb8tfowLgbeAbuAg8CZQTwEwDTgCZImP8adG+ssSekupMMY7Iz4G7gAu0fcn4h8Gxkl/GNALnAKagXuk82eF7WCNMyKFYEyb6DGiLaQMF4k+ToWxXwu5vYR8ouS/i75e9A/Oo0bvo8I4oYU0lJCPlNz0DJNEfyH6btFfUWUeeVD0FtGzRVsIVhQryyxkq+RWig1Pil4r+pmILoUR0m0HdgGtKuO54XKgT4vZKg806DsYYX3lJWCD012i8a+Jfn2QOZqBbxMle0fe/ecuoKdEH4k/VnZ3K+l91Xs28dx6YLE2wnR+Bh4H7nchbaGZKxqB5YMsvguY7/pJQKd0bHEe18ngMH61+lPAK5K15G2INcDv3eIHFMsvAlcn9BvcYnpU3Qx1wHNAv2S289MT+dIh+dy8DBgOvOrc/yMwD7gyoTtaE38EHJP+f8AcyccCn7nN+EBjPG4FvnGngbABQ8KNwNfO/SvUqWOMUeKfiDz2uY4oyMBDkv0FPBY9Y5gqVXjGT8AtQzXgAsX7MdcjppQ5VAYDOpXYjc7IzU5u3roiGj9BORY2bBVw8VCNsGTd6SZeD4wqM6bOjVnn+A8DB8S3svxUYty8KF/ik/RZGxEmtneJR5xsrur6DSXGWhU6qh21sHnHbYblRVOkb/nS7nTeT+TLWWODHtqhRmi41PHDmcniOYWWqCz3q0LZznvE+fIoOSN4w2IW7f4vblHd+r2gxHhrcHuk0yUveZxJvuSCvzVBU7TDA+ojM0QfTSwyoFGhFXvN58vhRL7kig81kcU3quGhCW5SiLznjulW3crBCsW7zgvbE/mSO2yX/9GETzteiOdFwGXAH6KfL/O8O1W6gxdfSOTLOcMTmth6yG3izVR42ecBVbNMRtsbYAoPubL65SDV7pxihRbwqzxgeFm8A2pWG0V/mhh/k2umbZW8ChruDm3blAt1OiQab5a7ZDAveZju3uhCoqK4ylWZlapG4dhtr7O4BPaYKt5veRwz8sJkXeP4JrdPx+xShoTmuZCC4V41t17lw7VOljLkO/FupoqQJQw5Uub6qGoMyRK8wiOrGVIwZDWPFAxZzSMFQ1bzSMGQ1TxSMGQ1jxQM/fJIeIEa4W7gqwqdWvgb+pOmVbT9LVBVuA84Gb1BDuh2vuowTZd1fboujf99quF/gdOGyJBYOPxdzgAAAABJRU5ErkJggg=="
const teknikFill = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwElEQVR4nO2ZXYhNURTHf5cZ46tBiW4zxoxpUHjyhjxI8SDM5ONFko9hmCcPSDx5mKKRrzxRpORZMSHGjFDKi/IgIY2EZDIzIeJq1zp1mvY5e597zj33nt38az3dvdZev732Xmefc2FMRWkKUEUZtQnoB0bE+oC2CP7TgXtAAfgCrKQMOiMJ6KzbMsbFUX7vgBwpV6JgsFaLOO81fqpKqemRBchDQ4xq4O8on19pV2TEAmTYEKNR4/OalDVsAfLdEGOFxuc+KavPAqTXEGOLxucKKavNAmSDIcZBjc8JyqDuEIiTAT4TpZvdCDhn7ZZzNwKXgQ/AALAjLkyrbCHvgdirqcQEYB1wTc5NWBXXGubLAZ2aRVDdbwElkLpurJFV+2axDT2bFxKzSRYqyPdQ0hBLgZcRkvfsSUgV9lt0yiNJVuEY8DsigNoWN4HZAWdBtWRTDDXn4iQgWoCnEZJXT/AeYC+QD6jCPmDIItYgsDUugJqww/JJ79kroDYk5lzfjdhkPUB9XIi8BCoUYTsDFmWPRWcryJjdSdzLFMSbIiG87VDnizcHuGPpexdoICFdCpnoh2VCt2RFd1lWYUjOTaK348GA7tMlzwKbxJS9sBz3QDpYohoX0GKv+8Z0xNh2flNN5EAp31Guaib9B6z3wfbHhFA37GZKrGnA24BDrK4SSvOBn0UAqDN2WBYjFS0D/mgSeQbUyJijESEey8M1dR0PSOic79ry3AJAbcuz8h5fFo2Xjwy65FbJmNUGCFXVzVSA6oGvmgRPy+9LDCDbqSBt1CS4TX5bFAJxmwpUp3wpHJDrvNf7F4aALCdDagkBmUyG1BwCkik1uQLS4ApInSsgeVdAZrkCMtMVkBmugNS6AjLVFZBJroDUuAJS5QpIzhUQpU8aiM9kUF0akPNkUNXAKfkb7iNwIWsvVWMiIf0HY25lMtkw+Q8AAAAASUVORK5CYII="
const fisikLine = "data:image/png;base64,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"
const fisikFill = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEt0lEQVR4nO2Ze4hVVRTGf6WV45QZUlkq0UvLggoqJCRSCw3rjzJT6IFlhURFD8OIykfRi+hBEUVRRn/Yy8yKsIeJYC/LhDKKHAt6SdpQTTU11szEgm/H4rDPOft074VOzAeLe8+66+yzv33WXo99YQADqAWGAkuADqBHn4uBNmpG4h2gPyJv14nMkhwSQRZRE3SUENlMTdBTQuQP/idv5HNqgsUlRBZSE7QpOsVIvFWnqIUmu0gbu0efC+tCYmfgCOBkYAw1xSnaxN6NVgL7UCNMKQi5W4BDK453IHAu8CDwkcL1JuA8WuxOH5dEqW3AcSVjnA08A3xbMtbsVhE5qeTBQX4BpkXu30UuGLtnKTBRAeIa6Ta2ishjiURMdgDnZ+6/NGPzBHCvvls+CmiT+/YBI1pR5XZVINKviSwA9gZuA36O/D5f31dnnveu9Kc3m8g5FUl4KarHTtTnr3K9gLulv73ZRFYlTvqvCgQf0NibdX28e96F0q1rJon9Eyf4CTDBTaxIJrnxH5fual2/7uwsHO/WLCLXJq7wrbLfHXg08vsbwBf6PtP5/0XSPe+Imav9Jr1Fs6agLHf0R1wDTfQ14GntBZT4gv2fQDtwmK6/B3YC9gIGuyhpAaNhHJlI4htNIjVo2Io/B4zSfdukH+ds50r3YjOIhMHKxFY6BQfIfmtGv0J6e15AeFOdiYtUiIsTiUytMObXumes082XztzJJ8aQe8Y3SuTYRCKWmQcljrkssvoTMq3xGYpYYfxLaALyOsCsrJHPl+Ey2T8LnKY3s6uLUvsChyvkf+fKmYYxVj6dQmY7ML1kvGNy+vo1up6hPbGHKul+HXI0BWPchiyTPpUYtsoxDHK+/4HyiOFm6ezegMGKcKbfrxECkzL54YQKrvZ+Qdf4qmxmOd006dZnbFdLf1YjRK5XSX6XK6mtOZoH/JhA5oWccW/S7/c53Z7aFyFRBtwi23saIRLqoH65wwJXpY50Eaio8o3lgMnOtTw2Sj9F4XeDq/PsDf9rrItMbpN6DO8SW3KIWCSKoV0rbzJKUcpwfyYAfCabvsibqoRQOnj5HRgSabxeitgWtavrnd2H0s3WtdVo6DCjXW8uvKnKGJ6zymtz7JdGbM318hCap27gTe290a7vt4gVEFpi21uVMSuHiIXJGNZWPPudIZtVGf2X0ltVETBTOot2ybDo8bD8MkbEDuhi+Cpi68NrFiNl05VZ/Selv9LpRjvbpFJouivqYrJDjVMW1sX1RuyPKnle6Cb9Wdg8V8KgzvEnN6ZVBrkY4VaiSJ4qKGOytr0JB9lhX92g5muo64G2ZlqJbn1enjfY0Qm1VK8OC+xBMUyN3GNtbdU2YbI2faeuDwGGqZCcW7KY/5wh5cmGkmNQ7w5eXkkgYvkj2NvZ76nSh1A+x9mOK1sg739eurThUjbXnZH7ffGXB8v622V/sNNfJ90jkXRgbyuK5ZFJLE/sLQIeioyR2gytlP0FTjdRuk8V3c5UkjTdy0UbfYVqqffU7FTFnEiNZf15Cq5wf9UNVzaPuarJD66caQnM/e6Qm3RoBVMxzHWCMelWsr2xDn8mHSSv6FQeM9e+Sr28PxMeAP9l/A0T58UFx+0OCAAAAABJRU5ErkJggg=="
const srcSambungline = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG40lEQVR4nO2ZB4xVRRSGPxZcWEDEAqIiFqIYRdSIDWNDlEXAhiJqgqCCLWBUCIiKgGCJmiAqIoIagh2CEntBidgFBbGiAi42rAhLZ685yT/JyeS+9+7bXUI24U9e3ptzZ+bOOXPKP/NgO+o+GgNjgO+BDfoeBZRRh1AGvA8kKZ/3alGZxlvbWKO16KXAqUAToAuwTPJb64qxvteEnSN5F8mX1BFjsUGTNY3kO0q+vo4Yi/ASs5THaZJ/V8Rc+wOHAA22gbEYpcmWyUJNpUTY9pE5xu0AHANcB8wEfnN+/wNw6FYyVk6UKeDSAvFdoJH67QR0A8YC7wCVKf1/cQZYVAvGKhqNFHBL5Ab2/ShwOTBRi9oSLdrai4GHgb5AW2eY4EqWcosxVo1hPn0kMBh4BliR8sK1wFzgdqA7sHM0R0O5zhT1rwDqFTDWyNpS4hQtfHXKwn8HZgHXA8cpJmIcCAwCXgTWuLGbgPPUZw+gNzAA6JpigBrvwHj34irgK1mznxaYhmbAOcBDwI8pypsL3g0cpJh6DNgc9bH2p8BdQPuaKFECTNek64DhwO55+nYEbpJbbYoW9SfwNNAf2NON2w/4xr1jFjBZc6yP5pimAlk0JmoCc6dOBXZtYfRSU2QecAtwNFA/ZZzF2q/qv0BKeZQpc5lH/Kd+L0bxVBB3OCtZfORDJ/X9V9bsBTQvMKabi7dXUgpgjHaKRet/ERkxXAM2Aj3cRObTHwOzgSNc/5vVf0LG+S9zrjc1pbrnQn+NsdpUEFe5QOujNPmWgty7ziplGcMcySy486HEkcIqRwDrZ9jBQFM26pN3By9Q8apSgTP8rBevkfU6KxAT9SmT+9m4XaL5bHHlqtavSfmw05eqTwdlQav+LSXbVal8rJ57fKA5LD2nYlf3IuNEAeXa0mayaDfxo0Q5/1QXrAEn6YVxhU+06K4K2GtkhKBcc1l9SZSCR7lkEWLXvlPRSx3M2jHMhUbojJC4hVuFHqf2veq7t+NWlZrPXtoTaOGM9nyk4Kt6NkDtL4BJzhhztI5yte3wlYqe6vC5tC8RWZsha4UXLpVSjaOtDknhCrVfBkrd/LajJwNDREkSpdQ/9Hug+g1S+3UZynZvpWTzFBshTlJrShMXD7a1yyOLzdSkpmBAQ2WfKlVnRDeCwlZDngS+TUkWnyjzrZP7hPhoDfylPh+p3VoGHRIZzwydCitQX0fWD7/TUOKUP1GyUi0gjg2z4HzVmf7q1ydHOj3K7drv2kmPyXp2JXnQQDXDTnAUUAQx3ERcKaCxXOxOucyRkZsFzNBYY9IxbIfedizheiWIpkoYicIhMwopcoDcZnWG6hy7cqXGmuukoYHYQljDMhdT3+YwTrUVwdWVUBuy4BKN+TBPn3aO+gRiGVxxX4pErMiZyiKnpyzKTnBZ0NJlIku3AWeL1gdcqT7Pyq32ycO+i1bkflfY6js3WSU3yXU+8ZilOd50TNZYQkj/AdOzBHV1FXnKyWwn4kxiwZ8PfZ27tJGsvY7HiYzRSvIHJRuxNRR5I0rPIeCOlWxFjrNHqPoheO10GTLcly47JcCFena+K461rshnzqKJ+FJAWJDxsRj1tKBE9CRgqmR2yxKOA4+4WKoSYS2tbUV+UnuQu58KdOUGycz9YgQOtdIF7MWSrZV7Ha62nfEDFkt2fE2UKNMkRtwCgi+XOaowTM/aqm03ifFuVERuc6A7IVrxNJS4OhGOvQ+obXcB1UZ3x3lCdkq0AEQdAo0ICwkB69FB8grFTyPnopZaPZ6T3E6RnpVbhqs2JmkS893AgQKpzOV6aQW0n2R2L+ZPoUtTToZX6dkTareQYSpFUotGPXeLeJhko6NgzKrI+MgFp6UkioBQzX91NWaRZCdUR5GOGrzcTThfsjOLVGRuRLsD6bNrojRU6PnBak9Q244FRSNY3yo5ulSrUrA3KUKRei5Vt9DYzaL1ue5yp7nMaDhXbbsEKRoLNDhwqoHugowiFAmZzNI2SqOJdjcX+qmPURl0qbFFh7CiLrL3ctQ8BNgLUarMqkivqAgOVtv+YiAPA0iAfxxLWBgd4DIhZA5LhUiZ1TnODoUUuU3tcIf1eHRGz4Ul6mexargvmicTXopIYXnKlU9WRWarfVaUgezUmCX1D3MUP9GpMTPCObxVRN3HVEORcInRRmxgk27ZC3Gn3hFh3E1tq/yZ8YOzYhv352XHPEp3coG8IuX5GcDV+m3UphBaSOl14mA9XDnIjKHOskkBKh1u/vzHLu0C7k55Hih8IUxJGRtcLROMM92olPm3bkjCvVWMUinzs3ZiXOQ29jfcParUdnlwbRHrKNW/Vct12TC02P9GtoNthP8Bc9bjcQ7tGa4AAAAASUVORK5CYII="
const srcSambungfill = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEvElEQVR4nO2Ze4jVRRTHP2VlmZX03oww01CiFxgiadA7otIMe0qYVPbOoiAiUFCwqKV3Ri+ojLKbLPZgI3pSu/lHVFQYvaTMsCfqbpnp3btx6vxg+HHO7zfzu3utBb8wf9z5nTlzvjNnzpw5F7Zh8ONAoAb0aFsGjGUQkvgN6M816Rs5mBasZpDI2tLBtGA9BUTWM3CotXrBNmwlIj2tnmdZwQSyiikYAuz4Xy3YocCvju+OKRm7L3AWsAh4B/gDqAMPANu3cMFcjFQ/3aCtZpCQ1T4SuBJ4CviqwDBp0wdwwZrCnsDpwALg9RIft9p1FResKYgbHAZcCjwBrAQaiYaHrRcYxVbEScCLetj6B6D9AjwPTFD9uwJX6Mp3Ag8DFwFtA0VgO3WZZlY98+8OdaPDVW+Go4FVBWM/Aa4tiHJRWFTR8PW6gzeoofnIlOE0da8Yne8Cu1UhcX2i8XJeblZ3kchVBjlnWxLnWJJK4gKgD9gIPA4cr4dyIvCYfstPMjvRXavsdF9K8ngK8BewGRjtyMwwzk1M9NlJ75ZmztuNMSQmBD5bVx8+BmgH3gLmBv4eJndyWIuwhy7QG5HGbgG6gTc1wiXd7nKj/hwxycUqf2HQJ+4WYry62qPAZ44req0zl67LLl4dLPCaIhLDgC8iJ7pHx5wc9AkpwXC93WONlizg7eB3txoumATMBEbo73FB1nCQR+TcyIkbSgANrVlfdnHNTSDRoY+o5UHfiarntqBvrQYbWaSftO88j8jsiIlltc4IdvDrIOxmuCVCz/fAtGAH/wy+7az964xxody9HpE2J/2QvgeBIwLZvYHXApnFwbcDgB+Cb3U9I0/qrX5sYKzlCSO0/6OSxVhBAaYAHwC/A+8Dl2kOlEFSi/uN7FZI5bPhc9TocLyF53K6ZgXBoihtWU0ihqny7pJQuU+qYt2Z/KJ8A+wVLMgrzpwvpE6WnYOydnkFImc6uj7XCIXeWfNyqcy3wCGpk62NJCIhNxUdJWF5RiA7ViPZHL1caRWRur7LYzE9QmcDuBvYpYrhVYn068MoBhL1fmyB3mQiXc6EkhfF4NkEEv168baEyKnOhdUX8TSdWmDwS050fLlVRCSiLHSMuaqiS0kkkrA73/jW2+wz1yPSpkb1JrrXEofERn0OZ4miJTOZJjDEqVFlKcadxjd5jA01dI0pKGCEL8sdHLeVu6QyJjuJW4b9gU2GzH6GrkscEvl3jFcylcJDZdzu+HKZ6wnBPO4y5D7OJZAZ5jg7LZlyJaw0FD5SkUinIXeTM+8oZ/ekLJuM0Y6yqRWJrDbkTkjM8dqrELFeepuMAlkMkeHGQW9oduvhIccVk2G9u8U9qEBkoiEj6XoRzjbGNJxA4mJ3rWvlFV1TkYj1jK5F2LDZGHd+ChGvEHFwRSLthsytEXa8Z4yT8lI0njYUyLubikReNWSk8FeGeRHhvxBh8SBrdzRBxIpYMb4+yfGM6D+GrLTkOEf2O0M2H43qRjkoNkVaZ+g/KpbIYuOPFu//jWdysp8aMh/mZO6LNYR/X4jh2FWRf1n8g6Hqn11arnHLk/q8Xa672KX/L+YxTsuia7S+VVYiytsixL/U8J8VJbaB/zP+BuT+zRWFhQAbAAAAAElFTkSuQmCC"


const navLinks = [
  {
    role: "penguji",
    links: [
      { label: "senam", icon: <img src={senamLine}></img>, icon2: <img src={senamFill}></img>},
      { label: "jurus",  icon: <img src={jurusLine}></img>, icon2: <img src={jurusFill}></img> },
      { label: "fisik", icon: <img src={fisikLine}></img>, icon2: <img src={fisikFill}></img> },
      { label: "teknik", icon: <img src={teknikLine}></img>, icon2: <img src={teknikFill}></img> },
      { label: "sambung", icon: <img src={srcSambungline}></img>, icon2: <img src={srcSambungfill}></img> },
    ]
  }
];

function MainNavigation(props) {
  const { active, setActive } = props;
  const role = 'penguji'

  return (
    <header className="sticky z-10  w-full bg-white  h-16 justify-center flex mx-auto items-center shadow-md">
      {navLinks.map((navItem) => {
        return (
          <nav>
            <ul className="flex gap-6">
              {navItem.links.map((link, index) => (
                <li  onClick={() => setActive(link.label)} >
                  <div className='flex-col px-1 pt-4 py-2 w-12 items-center justify-center'>
                    <div
                    style = {
                      active === link.label ? {background: '#d4d5d6'} : {background: '#ffffff'} 
                    } 
                    className={active === link.label ? 'flex rounded-full items-center justify-center transition-all duration-200 ease-linear' :
                      'flex rounded-full items-center justify-center transition-all duration-200 ease-linear'}>
                      <div className='p-2'>
                        <div
                          key={index}
                          className={active === link.label ? 'text-black text-xl rounded-full' : 'text-gray text-xl rounded-full'}>
                          {active === link.label ? link.icon2 : link.icon}
                        </div>
                      </div>
                    </div>
                    <div className={active === link.label ? 'text-sm text-center text-black' : 'text-sm text-center text-gray'}>
                      {link.label}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        );
      })}
    </header>
  );
}

export default MainNavigation;